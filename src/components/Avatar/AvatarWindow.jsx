import { Modal } from "components/Modal/Modal";
import { SetAvatar } from "./SetAvatar";

export const AvatarWindow = ({ showModal, closeModal }) => {
    return (
        <>
            {showModal && (
                <Modal closeModal={closeModal}>
                    <SetAvatar />
                </Modal>
            )}
        </>
    );
};
