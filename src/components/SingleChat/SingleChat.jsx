import React, { useEffect, useState } from "react";

import { ChatState } from "context/ChatProvider";
import {
    Box,
    IconButton,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import { ProfileModal } from "../ProfileModal/ProfileModal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { getSender, getSenderFull } from "config/ChatLogics";
import { UserModal } from "../UserModal/UserModal";
import { UpdateGroupChatModal } from "../UpdateGroupChatModal/UpdateGroupChatModal";
import { ChatLoading } from "../ChatLoading/ChatLoading";

import { instance, instanceAuth, setAuthHeader } from "utils/axios";
import { LoadingComponent } from "../LoadingComponent/LoadingComponent";

import CircularProgress from "@mui/material/CircularProgress";

import "components/styles.css";
import { ScrollableChat } from "../ScrollableChat/ScrollableChat";

const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
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

            // socket.emit("join chat", selectedChat._id);
        } catch (error) {
            toast.error("Failed to Load the Messages", toastOptions);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [selectedChat]);

    const sendMessage = async (event) => {
        if (event.key === "Enter" && newMessage) {
            // socket.emit("stop typing", selectedChat._id);
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

                // socket.emit("new message", data);
                setMessages([...messages, data]);
            } catch (error) {
                toast.error("Failed to send the Message", toastOptions);
            }
        }
    };

    const typingHandler = (e) => {
        setNewMessage(e.target.value);
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

                                {/* <UpdateGroupChatModal
                                    fetchMessages={fetchMessages}
                                    fetchAgain={fetchAgain}
                                    setFetchAgain={setFetchAgain}
                                /> */}
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
        </>
    );
};
