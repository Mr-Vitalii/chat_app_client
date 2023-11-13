import React, { useState } from "react";
import { ChatState } from "context/ChatProvider";

import { Box, useTheme } from "@mui/material";
import { MyChats } from "components/MyChats/MyChats";
import { Chatbox } from "components/Chatbox/Chatbox";
import { Navbar } from "../components/Navbar/Navbar";

export const ChatPage = () => {
    const { user } = ChatState();
    const [fetchAgain, setFetchAgain] = useState(false);

    const theme = useTheme();

    return (
        <div style={{ width: "100%" }}>
            {user && <Navbar />}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    height: "89vh",
                    [theme.breakpoints.up("md")]: {
                        height: "85vh",
                    },
                    p: "10px",
                }}
            >
                {user && <MyChats fetchAgain={fetchAgain} />}
                {user && (
                    <Chatbox
                        fetchAgain={fetchAgain}
                        setFetchAgain={setFetchAgain}
                    />
                )}
            </Box>
        </div>
    );
};
