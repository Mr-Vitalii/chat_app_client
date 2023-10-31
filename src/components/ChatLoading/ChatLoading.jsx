import { Box, Skeleton } from "@mui/material";
import React from "react";

export const ChatLoading = () => {
    return (
        <Box sx={{ width: 300 }}>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
        </Box>
    );
};
