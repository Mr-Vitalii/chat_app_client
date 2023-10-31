import * as React from "react";

import { Modal, Box, Button } from "@mui/material";
import { SetAvatar } from "../Avatar/SetAvatar";

import { BoxStyled } from "./styled-components";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "yellow",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export const ChildModal = ({ openChildModal, setOpenChildModal, user }) => {
    // const [open, setOpen] = React.useState(false);
    // const handleOpen = () => {
    //     setOpen(true);
    // };
    const handleClose = () => {
        setOpenChildModal(false);
    };

    return (
        <Modal
            open={openChildModal}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <BoxStyled>
                <SetAvatar />
            </BoxStyled>
            {/* <Box sx={{ ...style }}></Box> */}
        </Modal>
    );
};
