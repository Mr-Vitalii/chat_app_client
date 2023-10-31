import { useState } from "react";
import { BoxStyled } from "./styled-components";

import {
    Backdrop,
    Modal,
    Fade,
    Button,
    IconButton,
    Typography,
    Box,
    Grid,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { SetAvatar } from "../Avatar/SetAvatar";
import { ChildModal } from "./ChildModal";

import { AppButton } from "components/global/AppButton/AppButton";

export const ProfileModal = ({ open, setOpen, user }) => {
    // const [open, setOpen] = useState(false);
    // const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openChildModal, setOpenChildModal] = useState(false);
    const handleOpenChildModal = () => {
        setOpenChildModal(true);
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <BoxStyled>
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
                            <AppButton
                                onClick={handleOpenChildModal}
                                sx={{ mt: 2 }}
                            >
                                Change Avatar
                            </AppButton>
                        </Box>
                        <Typography
                            id="transition-modal-description"
                            textAlign="center"
                            sx={{ mt: 2 }}
                        >
                            Email: {user.email}
                        </Typography>
                        <ChildModal
                            openChildModal={openChildModal}
                            setOpenChildModal={setOpenChildModal}
                            user={user}
                        />
                    </BoxStyled>
                </Fade>
            </Modal>
        </div>
    );
};
