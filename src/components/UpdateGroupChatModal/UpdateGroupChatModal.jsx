import React, { useState } from "react";
import { BasicModal } from "../BasicModal/BasicModal";
import { ChatState } from "context/ChatProvider";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, TextField, Typography, useTheme } from "@mui/material";
import { UserBadgeItem } from "../UserBadgeItem/UserBadgeItem";
import { AppLoadingButton } from "../global/AppLoadingButton/AppLoadingButton";

import { instance, instanceAuth, setAuthHeader } from "utils/axios";
import { ChatLoading } from "../ChatLoading/ChatLoading";
import { UserListItem } from "../UserAvatar/UserListItem";

const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
};

export const UpdateGroupChatModal = ({
    openModal,
    setOpenModal,
    fetchAgain,
    setFetchAgain,
}) => {
    const [groupChatName, setGroupChatName] = useState("");
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameloading, setRenameLoading] = useState(false);

    const { selectedChat, setSelectedChat, user } = ChatState();

    const theme = useTheme();

    const handleRename = async () => {
        if (!groupChatName) return;

        try {
            setRenameLoading(true);

            setAuthHeader(user.token);

            const { data } = await instanceAuth.put(`chat/rename`, {
                chatId: selectedChat._id,
                chatName: groupChatName,
            });

            console.log(data);

            console.log(data._id);
            // setSelectedChat("");
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setRenameLoading(false);
        } catch (error) {
            toast.error(`${error.response.data.message}`, toastOptions);
            setRenameLoading(false);
        }
        setGroupChatName("");
    };

    const handleAddUser = async (user1) => {
        if (selectedChat.users.find((u) => u._id === user1._id)) {
            toast.error("User Already in group!", toastOptions);
            return;
        }

        if (selectedChat.groupAdmin._id !== user._id) {
            toast.error("Only admins can add someone!", toastOptions);
            return;
        }

        try {
            setLoading(true);

            setAuthHeader(user.token);

            const { data } = await instanceAuth.put(`chat/groupadd`, {
                chatId: selectedChat._id,
                userId: user1._id,
            });

            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoading(false);
        } catch (error) {
            toast.error(`${error.response.data.message}`, toastOptions);
            setLoading(false);
        }
        setGroupChatName("");
    };

    const handleRemove = async (user1) => {
        if (
            selectedChat.groupAdmin._id !== user._id &&
            user1._id !== user._id
        ) {
            toast.error("Only admins can remove someone!", toastOptions);
            return;
        }

        try {
            setLoading(true);

            setAuthHeader(user.token);

            const { data } = await instanceAuth.put(`chat/groupremove`, {
                chatId: selectedChat._id,
                userId: user1._id,
            });

            user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            // fetchMessages();
            setLoading(false);
        } catch (error) {
            toast.error(`${error.response.data.message}`, toastOptions);

            setLoading(false);
        }
        setGroupChatName("");
    };

    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) {
            return;
        }

        try {
            setLoading(true);

            setAuthHeader(user.token);

            const { data } = await instanceAuth.get(
                `user/users?search=${query}`,
            );

            console.log(data);

            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast.error("Failed to Load the Search Results", toastOptions);
        }
    };

    return (
        <>
            <BasicModal open={openModal} setOpen={setOpenModal}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h4">
                        {selectedChat.chatName}
                    </Typography>
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexWrap: "wrap",
                            pb: 3,
                        }}
                    >
                        {selectedChat.users.map((selectedUser) => (
                            <UserBadgeItem
                                key={selectedUser._id}
                                selectedUser={selectedUser}
                                handleFunction={() =>
                                    handleRemove(selectedUser)
                                }
                            />
                        ))}
                    </Box>
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            [theme.breakpoints.up("md")]: {
                                flexDirection: "row",
                            },
                            mb: 2,
                        }}
                    >
                        <TextField
                            placeholder="Chat Name"
                            value={groupChatName}
                            onChange={(e) => setGroupChatName(e.target.value)}
                            fullWidth
                        />
                        <AppLoadingButton
                            sx={{ ml: 1 }}
                            loading={renameloading}
                            onClick={handleRename}
                        >
                            Update
                        </AppLoadingButton>
                    </Box>
                    <Box sx={{ width: "100%" }}>
                        <TextField
                            fullWidth
                            placeholder="Add User to group"
                            sx={{ mb: 1 }}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </Box>
                    {loading ? (
                        <ChatLoading />
                    ) : (
                        searchResult?.map((searchUser) => (
                            <UserListItem
                                key={searchUser._id}
                                searchUser={searchUser}
                                handleFunction={() => handleAddUser(searchUser)}
                            />
                        ))
                    )}
                    <Box>
                        <AppLoadingButton onClick={() => handleRemove(user)}>
                            Leave Group
                        </AppLoadingButton>
                    </Box>
                </Box>
            </BasicModal>
            <ToastContainer />
        </>
    );
};
