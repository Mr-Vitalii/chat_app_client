import * as React from "react";

import { Modal } from "@mui/material";
import { SetAvatar } from "components/Avatar/SetAvatar";

import { BoxStyled } from "./styled-components";

export const ChildModal = ({ openChildModal, setOpenChildModal, user }) => {
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
        </Modal>
    );
};
