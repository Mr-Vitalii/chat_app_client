import React, { useEffect, useState } from "react";

import { ChatState } from "context/ChatProvider";
import {
    Box,
    IconButton,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import VisibilityIcon from "@mui/icons-material/Visibility";

import io from "socket.io-client";

import { getSender, getSenderFull } from "config/ChatLogics";
import { UserModal } from "../UserModal/UserModal";
import { UpdateGroupChatModal } from "../UpdateGroupChatModal/UpdateGroupChatModal";

import { instance, instanceAuth, setAuthHeader } from "utils/axios";

import CircularProgress from "@mui/material/CircularProgress";

import Lottie from "react-lottie";
import animationData from "assets/animations/TypingIndicator.json";

import "components/styles.css";
import { ScrollableChat } from "../ScrollableChat/ScrollableChat";

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

    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const theme = useTheme();

    const [openUserModal, setOpenUserModal] = useState(false);
    const handleUserModalOpen = () => setOpenUserModal(true);

    const [openUpdateGroupModal, setOpenUpdateGroupModal] = useState(false);
    const handleUpdateGroupModalOpen = () => setOpenUpdateGroupModal(true);

    const fetchMessages = async () => {
        if (!selectedChat) return;

        try {
            setAuthHeader(user.token);

            setLoading(true);

            const { data } = await instanceAuth.get(
                `message/${selectedChat._id}`,
            );

            console.log(messages);
            setMessages(data);
            setLoading(false);

            socket.emit("join chat", selectedChat._id);
        } catch (error) {
            toast.error("Failed to Load the Messages", toastOptions);
        }
    };

    const sendMessage = async (event) => {
        if (event.key === "Enter" && newMessage) {
            socket.emit("stop typing", selectedChat._id);
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

                console.log(data);

                socket.emit("new message", data);
                setMessages([...messages, data]);
            } catch (error) {
                toast.error("Failed to send the Message", toastOptions);
            }
        }
    };

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on("connected", () => setSocketConnected(true));
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));
    }, [user]);

    useEffect(() => {
        fetchMessages();
        selectedChatCompare = selectedChat;
    }, [selectedChat]);

    useEffect(() => {
        socket.on("message received", (newMessageReceived) => {
            if (
                !selectedChatCompare || // if chat is not selected or doesn't match current chat
                selectedChatCompare._id !== newMessageReceived.chat._id
            ) {
                //* give notification
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
        var timerLength = 3000;
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
                                sx={{ color: "red", backgroundColor: "yellow" }}
                            />
                        </IconButton>
                        {!selectedChat.isGroupChat ? (
                            <>
                                <Typography sx={{ color: "red" }}>
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
                                            color: "red",
                                            backgroundColor: "yellow",
                                        }}
                                    />
                                </IconButton>
                            </>
                        ) : (
                            <>
                                <Typography sx={{ color: "red" }}>
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
                                            color: "red",
                                            backgroundColor: "yellow",
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
                            backgroundColor: "#e9a5a5",
                            width: "100%",
                            height: "100%",
                            borderRadius: "10px",
                            overflowY: "hidden",
                        }}
                    >
                        {loading ? (
                            <CircularProgress />
                        ) : (
                            <div className="messages">
                                <ScrollableChat messages={messages} />
                            </div>
                        )}
                        <Box>
                            {isTyping ? (
                                <div>
                                    Loading....
                                    <Lottie
                                        options={defaultOptions}
                                        // height={50}
                                        width={70}
                                        style={{
                                            marginBottom: 15,
                                            marginLeft: 0,
                                        }}
                                    />
                                </div>
                            ) : (
                                <></>
                            )}
                            <TextField
                                placeholder="Enter a message.."
                                fullWidth
                                value={newMessage}
                                onChange={typingHandler}
                                onKeyDown={sendMessage}
                            />
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
                // to get socket.io on same page
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
                        sx={{ pb: 3, fontFamily: "Work sans", color: "red" }}
                    >
                        Click on a user to start chatting
                    </Typography>
                </Box>
            )}
            <ToastContainer />
        </>
    );
};
