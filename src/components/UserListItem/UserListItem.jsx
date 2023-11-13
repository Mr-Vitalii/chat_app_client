import React from "react";
import { Box, Avatar, Typography } from "@mui/material";

import { ChatState } from "context/ChatProvider";

import { colors } from "theme";

export const UserListItem = ({ searchUser, handleFunction }) => {
    const { isMobile } = ChatState();

    return (
        <Box
            onClick={handleFunction}
            sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: colors.secondary[300],
                width: "100%",
                color: "black",
                p: isMobile ? 1 : 2,
                mb: 2,
                borderRadius: "8px",
                "&:hover": {
                    backgroundColor: colors.secondary[500],
                    color: "white",
                },
            }}
        >
            <Avatar
                src={searchUser.pic}
                alt="avatar"
                width="50px"
                sx={{ mr: 1, cursor: "pointer" }}
            />
            <Box>
                <Typography>{searchUser.name}</Typography>
                <Typography variant="body2">
                    <b>Email : </b>
                    {searchUser.email}
                </Typography>
            </Box>
        </Box>
    );
};
