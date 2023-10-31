import { Menu, MenuItem } from "@mui/material";
import React from "react";

export const NotificationMenu = ({
    anchorEl,
    menuId,
    isMenuOpen,
    handleMenuClose,
}) => {
    return (
        <Menu
            sx={{ mt: "45px" }}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );
};
