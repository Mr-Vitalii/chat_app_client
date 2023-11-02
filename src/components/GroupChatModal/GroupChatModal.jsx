import React, { useState } from "react";
import { BasicModal } from "../BasicModal/BasicModal";
import { ChatState } from "context/ChatProvider";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Button, TextField } from "@mui/material";

import { UserListItem } from "components/UserAvatar/UserListItem";
import { UserBadgeItem } from "../UserBadgeItem/UserBadgeItem";

import { instance, instanceAuth, setAuthHeader } from "utils/axios";
import { AppLoadingButton } from "../global/AppLoadingButton/AppLoadingButton";

export const GroupChatModal = ({ openModal, setOpenModal, handleOpen }) => {
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user, chats, setChats } = ChatState();

    const toastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
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

            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast.error("Failed to Load the Search Results", toastOptions);
        }
    };

    const handleDelete = (delUser) => {
        setSelectedUsers(
            selectedUsers.filter((sel) => sel._id !== delUser._id),
        );
    };

    const handleSubmit = async () => {
        if (!groupChatName || !selectedUsers) {
            toast.warning("Please fill all the feilds", toastOptions);
            return;
        }

        try {
            setLoading(true);
            setAuthHeader(user.token);

            const { data } = await instanceAuth.post(`chat/group`, {
                name: groupChatName,
                users: JSON.stringify(
                    selectedUsers.map((selectedUser) => selectedUser._id),
                ),
            });
            setChats([data, ...chats]);
            setLoading(false);
            setOpenModal(false);
            toast.success("New Group Chat Created!", toastOptions);
        } catch (error) {
            toast.error("Failed to Create the Chat!", toastOptions);
        }
    };

    const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
            toast.warning("User already added", toastOptions);
            return;
        }

        setSelectedUsers([...selectedUsers, userToAdd]);
    };

    return (
        <>
            <BasicModal open={openModal} setOpen={setOpenModal}>
                <Box
                    sx={{
                        fontSize: "35px",
                        fontFamily: "Work sans",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    Create Group Chat
                </Box>
                <form onSubmit={handleSubmit}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <TextField
                            id="outlined-basic"
                            label="Chat Name"
                            variant="outlined"
                            fullWidth
                            autoComplete="off"
                            placeholder="Chat Name"
                            onChange={(e) => setGroupChatName(e.target.value)}
                            sx={{ mb: 3 }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Add Users"
                            variant="outlined"
                            fullWidth
                            autoComplete="off"
                            placeholder="Add Users eg: John, Piyush, Jane"
                            onChange={(e) => handleSearch(e.target.value)}
                            sx={{ mb: 1 }}
                        />
                    </Box>
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexWrap: "wrap",
                        }}
                    >
                        {selectedUsers.map((selectedUser) => (
                            <UserBadgeItem
                                key={selectedUser._id}
                                selectedUser={selectedUser}
                                handleFunction={() =>
                                    handleDelete(selectedUser)
                                }
                            />
                        ))}
                    </Box>
                    {loading ? (
                        // <ChatLoading />
                        <div>Loading...</div>
                    ) : (
                        searchResult
                            ?.slice(0, 4)
                            .map((searchUser) => (
                                <UserListItem
                                    key={searchUser._id}
                                    searchUser={searchUser}
                                    handleFunction={() =>
                                        handleGroup(searchUser)
                                    }
                                />
                            ))
                    )}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <AppLoadingButton
                            onClick={handleSubmit}
                            loading={loading}
                            type="submit"
                        >
                            Create Chat
                        </AppLoadingButton>
                    </Box>
                </form>
            </BasicModal>
            <ToastContainer />
        </>
    );
};
