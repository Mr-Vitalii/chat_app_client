import { Box, Skeleton } from "@mui/material";

export const ChatLoading = () => {
    return (
        <Box sx={{ width: "100%", m: 2 }}>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
        </Box>
    );
};
