import React, { useCallback, useEffect, useState } from "react";

import { ChatState } from "context/ChatProvider";
import {
    Box,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
    useTheme,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import io from "socket.io-client";

import { getSender, getSenderFull } from "config/ChatLogics";
import { instance, instanceAuth, setAuthHeader } from "utils/axios";
import animationData from "assets/animations/TypingIndicator.json";

import { UserModal } from "components/modal/UserModal/UserModal";
import { UpdateGroupChatModal } from "components/modal/UpdateGroupChatModal/UpdateGroupChatModal";

import { ScrollableChat } from "components/ScrollableChat/ScrollableChat";

import SendIcon from "@mui/icons-material/Send";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lottie from "react-lottie";

import { colors } from "theme";

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
};
const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
};

export const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const {
        selectedChat,
        setSelectedChat,
        user,
        notification,
        setNotification,
    } = ChatState();

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);

    const [newNotification, setNewNotification] = useState("");

    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const theme = useTheme();

    const [openUserModal, setOpenUserModal] = useState(false);
    const handleUserModalOpen = () => setOpenUserModal(true);

    const [openUpdateGroupModal, setOpenUpdateGroupModal] = useState(false);
    const handleUpdateGroupModalOpen = () => setOpenUpdateGroupModal(true);

    const fetchMessages = useCallback(async () => {
        if (!selectedChat) return;

        try {
            setAuthHeader(user.token);

            setLoading(true);

            const { data } = await instanceAuth.get(
                `message/${selectedChat._id}`,
            );

            setMessages(data);
            setLoading(false);

            socket.emit("join chat", selectedChat._id);
        } catch (error) {
            toast.error("Failed to Load the Messages", toastOptions);
        }
    }, [selectedChat, user.token]);

    const fetchNotification = useCallback(async () => {
        try {
            setAuthHeader(user.token);

            setLoading(true);

            const { data } = await instanceAuth.get(`notification`);

            setNotification(data);
            setLoading(false);
        } catch (error) {
            toast.error("Failed to Load the Notification", toastOptions);
        }
    }, [setNotification, user.token]);

    const sendMessage = async () => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };

            setNewMessage("");

            const { data } = await instance.post(
                "message",
                {
                    content: newMessage,
                    chatId: selectedChat,
                },
                config,
            );

            socket.emit("new message", data);
            setMessages([...messages, data]);
        } catch (error) {
            toast.error("Failed to send the Message", toastOptions);
        }
    };

    const handleSendMessage = () => {
        socket.emit("stop typing", selectedChat._id);
        sendMessage();
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && newMessage) {
            socket.emit("stop typing", selectedChat._id);
            sendMessage();
        }
    };

    const sendNotification = useCallback(async () => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };

            setNewNotification("");

            const notificationData = await instance.post(
                "notification",
                {
                    content: newNotification.content,
                    chatId: newNotification.chat,
                },
                config,
            );

            if (notificationData) {
                setNotification([notificationData.data, ...notification]);
            }
        } catch (error) {
            console.log(error);
        }
    }, [newNotification, user.token, setNotification, notification]);

    const deleteNotificationsFromCurrentChat = useCallback(async () => {
        try {
            setAuthHeader(user.token);

            await instanceAuth.delete(`notification/chat/${selectedChat._id}`);
        } catch (error) {
            console.log(error);
        }
    }, [selectedChat, user.token]);

    useEffect(() => {
        if (newNotification) {
            sendNotification();
        }
    }, [sendNotification, newNotification]);

    useEffect(() => {
        if (selectedChat) {
            deleteNotificationsFromCurrentChat();
        }
    }, [deleteNotificationsFromCurrentChat, selectedChat]);

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on("connected", () => setSocketConnected(true));

        socket.on("typing", (chatId) => {
            if (selectedChat && chatId === selectedChat._id) {
                setIsTyping(true);
            }
        });

        socket.on("stop typing", () => setIsTyping(false));

        return () => {
            socket.disconnect(user);
        };
    }, [user, selectedChat]);

    useEffect(() => {
        fetchMessages();
        selectedChatCompare = selectedChat;
    }, [selectedChat, fetchMessages]);

    useEffect(() => {
        fetchNotification();
    }, [fetchNotification]);

    useEffect(() => {
        socket.on("message received", (newMessageReceived) => {
            if (
                !selectedChatCompare ||
                selectedChatCompare._id !== newMessageReceived.chat._id
            ) {
                //* give notification
                if (!notification.includes(newMessageReceived)) {
                    setNewNotification(newMessageReceived);
                    setFetchAgain(!fetchAgain);
                }
            } else {
                setMessages([...messages, newMessageReceived]);
            }
        });
    });

    const typingHandler = (e) => {
        setNewMessage(e.target.value);

        if (!socketConnected) return;

        if (!typing) {
            setTyping(true);
            socket.emit("typing", selectedChat._id);
        }

        let lastTypingTime = new Date().getTime();
        var timerLength = 2000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", selectedChat._id);
                setTyping(false);
            }
        }, timerLength);
    };

    return (
        <>
            {selectedChat ? (
                <>
                    <Box
                        sx={{
                            fontSize: "28px",
                            [theme.breakpoints.up("md")]: {
                                fontSize: "30px",
                            },
                            pb: 3,
                            px: 2,
                            width: "100%",
                            fontFamily: "Work sans",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <IconButton
                            aria-label="ArrowBackIosIcon"
                            sx={{
                                display: "flex",
                                [theme.breakpoints.up("md")]: {
                                    display: "none",
                                },
                            }}
                            onClick={() => setSelectedChat("")}
                        >
                            <ArrowBackIosIcon
                                sx={{
                                    color: colors.whiteAccent[500],
                                    backgroundColor: "inherit",
                                }}
                            />
                        </IconButton>
                        {!selectedChat.isGroupChat ? (
                            <>
                                <Typography
                                    sx={{ color: colors.whiteAccent[500] }}
                                >
                                    {getSender(user, selectedChat.users)}
                                </Typography>

                                <IconButton
                                    aria-label="ArrowBackIosIcon"
                                    sx={{
                                        display: "flex",
                                    }}
                                    onClick={handleUserModalOpen}
                                >
                                    <VisibilityIcon
                                        sx={{
                                            color: colors.whiteAccent[500],
                                            backgroundColor: "inherit",
                                        }}
                                    />
                                </IconButton>
                            </>
                        ) : (
                            <>
                                <Typography
                                    sx={{ color: colors.whiteAccent[500] }}
                                >
                                    {selectedChat.chatName.toUpperCase()}
                                </Typography>
                                <IconButton
                                    aria-label="ArrowBackIosIcon"
                                    sx={{
                                        display: "flex",
                                    }}
                                    onClick={handleUpdateGroupModalOpen}
                                >
                                    <VisibilityIcon
                                        sx={{
                                            color: colors.whiteAccent[500],
                                            backgroundColor: "inherit",
                                        }}
                                    />
                                </IconButton>
                            </>
                        )}
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                            p: 3,
                            backgroundColor: colors.primaryDarkTheme[600],
                            width: "100%",
                            height: "100%",
                            borderRadius: "10px",
                            overflowY: "hidden",
                        }}
                    >
                        {loading ? (
                            <CircularProgress sx={{ m: "auto" }} />
                        ) : (
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    overflowY: "scroll",
                                    scrollbarWidth: "none",
                                }}
                            >
                                <ScrollableChat messages={messages} />
                            </Box>
                        )}
                        <Box>
                            {isTyping ? (
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        mt: 1,
                                    }}
                                >
                                    <Typography> Typing</Typography>
                                    <Lottie
                                        options={defaultOptions}
                                        width={70}
                                        height={30}
                                        style={{
                                            marginBottom: 0,
                                            marginLeft: 0,
                                        }}
                                    />
                                </Box>
                            ) : (
                                <></>
                            )}
                            <FormControl
                                sx={{ mt: 1, width: "100%" }}
                                variant="outlined"
                            >
                                <InputLabel
                                    htmlFor="send-message"
                                    color="secondary"
                                >
                                    Enter a message..
                                </InputLabel>
                                <OutlinedInput
                                    id="send-message"
                                    color="secondary"
                                    fullWidth
                                    value={newMessage}
                                    onChange={typingHandler}
                                    onKeyDown={handleKeyDown}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="send-message"
                                                onClick={handleSendMessage}
                                                edge="end"
                                            >
                                                <SendIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Send Message"
                                />
                            </FormControl>
                        </Box>
                    </Box>
                    <UserModal
                        openModal={openUserModal}
                        setOpenModal={setOpenUserModal}
                        user={getSenderFull(user, selectedChat.users)}
                    />
                    <UpdateGroupChatModal
                        openModal={openUpdateGroupModal}
                        setOpenModal={setOpenUpdateGroupModal}
                        fetchAgain={fetchAgain}
                        setFetchAgain={setFetchAgain}
                        fetchMessages={fetchMessages}
                    />
                </>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                    }}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            pb: 3,
                            fontFamily: "Work sans",
                            color: colors.whiteAccent[500],
                        }}
                    >
                        Click on a user to start chatting
                    </Typography>
                </Box>
            )}
        </>
    );
};
