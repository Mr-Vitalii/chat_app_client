import React, { useEffect, useState } from "react";
import { ChatState } from "context/ChatProvider";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { instance, instanceAuth, setAuthHeader } from "utils/axios";
import { Box, Button, Typography, Stack, useTheme } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";

import SearchIcon from "@mui/icons-material/Search";
import { ChatLoading } from "../ChatLoading/ChatLoading";

import { getSender } from "config/ChatLogics";

export const MyChats = () => {
    const [loggedUser, setLoggedUser] = useState();

    const { user, selectedChat, setSelectedChat, chats, setChats, isMobile } =
        ChatState();

    console.log(selectedChat);

    const theme = useTheme();

    const toastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const fetchChats = async () => {
        // console.log(user._id);
        try {
            setAuthHeader(user.token);

            const { data } = await instanceAuth.get("chat");
            console.log(data);
            setChats(data);
        } catch (error) {
            toast.error("Failed to Load the chats", toastOptions);
        }
    };

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchChats();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    [theme.breakpoints.down("md")]: {
                        display: selectedChat ? "none" : "flex",
                    },
                    flexDirection: "column",
                    alignItems: "center",
                    p: 3,
                    backgroundColor: "green",
                    width: "100%",
                    [theme.breakpoints.up("md")]: {
                        width: "31%",
                    },
                    borderRadius: "10px",
                    borderWidth: "1px",
                }}
            >
                <Box
                    sx={{
                        pb: 3,
                        px: 3,
                        fontSize: "28px",
                        [theme.breakpoints.up("md")]: {
                            fontSize: "30px",
                        },
                        fontFamily: "Work sans",
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography> My Chats</Typography>

                    <Button
                        variant="contained"
                        sx={{
                            display: "flex",
                            fontSize: "17px",
                            [theme.breakpoints.up("md")]: {
                                fontSize: "10px",
                            },
                            [theme.breakpoints.up("lg")]: {
                                fontSize: "17px",
                            },
                        }}
                        endIcon={<AddIcon />}
                    >
                        New Group Chat
                    </Button>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        p: 3,
                        backgroundColor: "#F8F8F8",
                        width: "100%",
                        height: "100%",
                        borderRadius: "10px",
                        overflowY: "hidden",
                    }}
                >
                    {chats ? (
                        <Stack sx={{ overflowY: "scroll" }}>
                            {chats.map((chat) => (
                                <Box
                                    key={chat._id}
                                    onClick={() => setSelectedChat(chat)}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        cursor: "pointer",
                                        p: 3,
                                        backgroundColor:
                                            selectedChat === chat
                                                ? "#38B2AC"
                                                : "#E8E8E8",
                                        color:
                                            selectedChat === chat
                                                ? "white"
                                                : "black",

                                        px: 3,
                                        py: 2,
                                        mb: 1,
                                        borderRadius: "10px",
                                    }}
                                >
                                    <Typography>
                                        {!chat.isGroupChat
                                            ? getSender(loggedUser, chat.users)
                                            : chat.chatName}
                                    </Typography>
                                    {/* {chat.latestMessage && (
                                        <Typography fontSize="xs">
                                            <b>
                                                {chat.latestMessage.sender.name}{" "}
                                                :{" "}
                                            </b>
                                            {chat.latestMessage.content.length >
                                            50
                                                ? chat.latestMessage.content.substring(
                                                      0,
                                                      51,
                                                  ) + "..."
                                                : chat.latestMessage.content}
                                        </Typography>
                                    )} */}
                                </Box>
                            ))}
                        </Stack>
                    ) : (
                        <ChatLoading />
                    )}
                </Box>
            </Box>
            <ToastContainer />
        </>
    );
};
