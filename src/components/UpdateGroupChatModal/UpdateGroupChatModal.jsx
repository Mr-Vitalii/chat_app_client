import React, { useState } from "react";
import { BasicModal } from "../BasicModal/BasicModal";
import { ChatState } from "context/ChatProvider";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Typography } from "@mui/material";

const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
};

export const UpdateGroupChatModal = ({ openModal, setOpenModal }) => {
    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameloading, setRenameLoading] = useState(false);

    const { selectedChat, setSelectedChat, user } = ChatState();
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
                </Box>
            </BasicModal>
            <ToastContainer />
        </>
    );
};
