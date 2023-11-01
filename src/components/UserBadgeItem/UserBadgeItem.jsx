import { Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

export const UserBadgeItem = ({ selectedUser, handleFunction }) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                px: 2,
                py: 1,
                borderRadius: "10px",
                m: 1,
                mb: 2,
                fontSize: "12px",
                backgroundColor: "purple",
                color: "white",
                cursor: "pointer",
            }}
            onClick={handleFunction}
        >
            {selectedUser.name}
            {/* {admin === user._id && <span> (Admin)</span>} */}
            <CloseIcon sx={{ pl: 1 }} />
        </Box>
    );
};
