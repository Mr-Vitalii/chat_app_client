import React from "react";
import { Box, useTheme } from "@mui/material";

import { ChatState } from "context/ChatProvider";
import { SingleChat } from "../SingleChat/SingleChat";

import { colors } from "theme";

export const Chatbox = ({ fetchAgain, setFetchAgain }) => {
    const { selectedChat } = ChatState();

    const theme = useTheme();

    return (
        <Box
            sx={{
                width: "68%",
                display: "flex",
                [theme.breakpoints.down("md")]: {
                    width: "100%",
                    display: selectedChat ? "flex" : "none",
                },
                flexDirection: "column",
                alignItems: "center",
                p: 3,
                backgroundColor: colors.primaryDarkTheme[500],

                borderRadius: "10px",
                borderWidth: "1px",
            }}
        >
            <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </Box>
    );
};
