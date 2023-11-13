import { BoxStyled } from "./styled-components";
import { Backdrop, Modal, Fade } from "@mui/material";

export const BasicModal = ({ open, setOpen, children }) => {
    const handleClose = () => setOpen(false);

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
                    <BoxStyled>{children}</BoxStyled>
                </Fade>
            </Modal>
        </div>
    );
};
