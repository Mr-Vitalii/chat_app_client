import React, { useState } from "react";

import { ChatState } from "context/ChatProvider";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { ProfileModal } from "../ProfileModal/ProfileModal";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { getSender, getSenderFull } from "config/ChatLogics";
import { UserModal } from "../UserModal/UserModal";
import { UpdateGroupChatModal } from "../UpdateGroupChatModal/UpdateGroupChatModal";

export const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const {
        selectedChat,
        setSelectedChat,
        user,
        notification,
        setNotification,
    } = ChatState();

    const theme = useTheme();

    const [openUserModal, setOpenUserModal] = useState(false);
    const handleUserModalOpen = () => setOpenUserModal(true);

    const [openUpdateGroupModal, setOpenUpdateGroupModal] = useState(false);
    const handleUpdateGroupModalOpen = () => setOpenUpdateGroupModal(true);

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
                            flexDirection: "flex-end",
                            justifyContent: "flex-end",
                            p: 3,
                            backgroundColor: "#e9a5a5",
                            width: "100%",
                            height: "100%",
                            borderRadius: "10px",
                            overflowY: "hidden",
                        }}
                    ></Box>
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
