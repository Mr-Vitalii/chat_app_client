import { Typography, Box } from "@mui/material";

import React from "react";
import { BasicModal } from "../BasicModal/BasicModal";
import { AppButton, AppLoadingButton } from "../global/AppButton/AppButton";

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
                    <img src={user.pic} alt="avatar" width="100px" />
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
