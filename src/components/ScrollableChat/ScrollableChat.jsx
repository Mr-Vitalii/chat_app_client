import { Avatar, Box, Tooltip, Typography } from "@mui/material";
import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { ChatState } from "context/ChatProvider";
import {
    isLastMessage,
    isSameSender,
    isSameSenderMargin,
    isSameUser,
} from "config/ChatLogics";

export const ScrollableChat = ({ messages }) => {
    const { user } = ChatState();
    return (
        <ScrollableFeed>
            {messages &&
                messages.map((m, i) => (
                    <Box sx={{ display: "flex" }} key={m._id + i}>
                        {(isSameSender(messages, m, i, user._id) ||
                            isLastMessage(messages, i, user._id)) && (
                            <Tooltip
                                title={m.sender.name}
                                placement="bottom-start"
                            >
                                <Avatar
                                    sx={{
                                        mt: "7px",
                                        mr: 1,
                                        cursor: "pointer",
                                        width: 24,
                                        height: 24,
                                    }}
                                    alt={m.sender.name}
                                    src={m.sender.pic}
                                />
                            </Tooltip>
                        )}
                        <span
                            style={{
                                backgroundColor: `${
                                    m.sender._id === user._id
                                        ? "#BEE3F8"
                                        : "#B9F5D0"
                                }`,
                                marginLeft: isSameSenderMargin(
                                    messages,
                                    m,
                                    i,
                                    user._id,
                                ),
                                marginTop: isSameUser(messages, m, i, user._id)
                                    ? 3
                                    : 10,
                                borderRadius: "20px",
                                padding: "5px 15px",
                                maxWidth: "75%",
                            }}
                        >
                            {m.content}
                        </span>
                    </Box>
                ))}
        </ScrollableFeed>
    );
};
