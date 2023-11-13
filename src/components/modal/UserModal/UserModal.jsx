import React from "react";

import { Typography, Box, Avatar } from "@mui/material";
import { BasicModal } from "components/modal/BasicModal/BasicModal";

export const UserModal = ({ openModal, setOpenModal, user }) => {
    return (
        <>
            <BasicModal open={openModal} setOpen={setOpenModal}>
                <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h2"
                    textAlign="center"
                    sx={{ mb: 2 }}
                >
                    {user.name}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar src={user.pic} alt="avatar" width="100px" />
                </Box>
                <Typography
                    id="transition-modal-description"
                    textAlign="center"
                    sx={{ mt: 2 }}
                >
                    Email: {user.email}
                </Typography>
            </BasicModal>
        </>
    );
};
