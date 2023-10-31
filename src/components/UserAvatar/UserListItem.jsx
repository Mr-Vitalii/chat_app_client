import { Box } from "@mui/system";
import React from "react";
import { ChatState } from "context/ChatProvider";
import { Avatar, Typography } from "@mui/material";

export const UserListItem = ({ searchUser, handleFunction }) => {
    const { user, isMobile } = ChatState();

    return (
        <Box
            onClick={handleFunction}
            sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#E8E8E8",
                width: "100%",
                color: "black",
                p: isMobile ? 1 : 2,
                mb: 2,
                borderRadius: "8px",
                "&:hover": {
                    backgroundColor: "#38B2AC",
                    color: "white",
                },
            }}
            // cursor="pointer"
            // bg="#E8E8E8"
            // _hover={{
            //     background: "#38B2AC",
            //     color: "white",
            // }}
            // w="100%"
            // d="flex"
            // alignItems="center"
            // color="black"
            // px={3}
            // py={2}
            // mb={2}
            // borderRadius="lg"
        >
            <Avatar
                src={user.pic}
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
