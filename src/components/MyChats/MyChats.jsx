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
import { GroupChatModal } from "../GroupChatModal/GroupChatModal";

import { colors } from "theme";
import { AppButton } from "../global/AppButton/AppButton";

export const MyChats = ({ fetchAgain, setFetchAgain }) => {
    const [loggedUser, setLoggedUser] = useState();

    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(true);

    const { user, selectedChat, setSelectedChat, chats, setChats, isMobile } =
        ChatState();

    const theme = useTheme();

    const toastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const fetchChats = async () => {
        try {
            setAuthHeader(user.token);

            const { data } = await instanceAuth.get("chat");

            setChats(data);
        } catch (error) {
            toast.error("Failed to Load the chats", toastOptions);
        }
    };

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchChats();
        // eslint-disable-next-line
    }, [fetchAgain]);

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    width: "31%",
                    [theme.breakpoints.down("md")]: {
                        display: selectedChat ? "none" : "flex",
                        width: "100%",
                    },
                    [theme.breakpoints.down("lg")]: {
                        p: 1,
                    },
                    flexDirection: "column",
                    alignItems: "center",
                    p: 3,
                    backgroundColor: colors.primaryDarkTheme[500],
                    borderRadius: "10px",
                    borderWidth: "1px",
                }}
            >
                <Box
                    sx={{
                        pb: 3,
                        px: 2,
                        fontSize: "28px",
                        [theme.breakpoints.up("md")]: {
                            px: 3,
                            fontSize: "30px",
                        },
                        fontFamily: "Work sans",
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        variant="body1"
                        sx={{
                            mr: 1,
                            [theme.breakpoints.down("lg")]: {
                                fontSize: "12px",
                            },
                        }}
                    >
                        My Chats
                    </Typography>
                    <AppButton
                        // variant="contained"
                        // sx={{
                        //     display: "flex",
                        //     fontSize: "14px",
                        //     [theme.breakpoints.up("md")]: {
                        //         fontSize: "10px",
                        //     },
                        //     [theme.breakpoints.up("lg")]: {
                        //         fontSize: "17px",
                        //     },
                        // }}
                        endIcon={<AddIcon />}
                        onClick={handleOpen}
                    >
                        New Group Chat
                    </AppButton>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        p: 3,
                        backgroundColor: colors.primaryDarkTheme[600],
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
                                                ? colors.primaryDarkTheme[300]
                                                : colors.secondary[500],
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
                                </Box>
                            ))}
                        </Stack>
                    ) : (
                        <ChatLoading />
                    )}
                </Box>
            </Box>
            <GroupChatModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                handleOpen={handleOpen}
            />
            <ToastContainer />
        </>
    );
};
