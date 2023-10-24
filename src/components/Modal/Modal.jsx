import React from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Backdrop, CloseButton, Content } from "./styled-components";

const modalRoot = document.querySelector("#modal");

export const Modal = ({ children, closeModal }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === "Escape") {
                closeModal();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            return window.removeEventListener("keydown", handleKeyDown);
        };
    }, [closeModal]);

    const handleBackdropClick = (e) => {
        if (e.currentTarget === e.target) {
            closeModal();
        }
    };

    return createPortal(
        <Backdrop onClick={handleBackdropClick}>
            <Content>
                <CloseButton onClick={() => closeModal()}>&#x2715;</CloseButton>
                {children}
            </Content>
        </Backdrop>,
        modalRoot,
    );
};
