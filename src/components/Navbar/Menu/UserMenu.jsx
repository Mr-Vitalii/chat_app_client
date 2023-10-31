import {
    Avatar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
    Typography,
} from "@mui/material";
import { ChatState } from "context/ChatProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SetAvatar } from "../../Avatar/SetAvatar";
import { ProfileModal } from "../../ProfileModal/ProfileModal";

export const UserMenu = ({
    handleOpenUserMenu,
    anchorElUser,
    handleCloseUserMenu,
}) => {
    const { user } = ChatState();

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    const handleProfileMenu = () => {
        handleCloseUserMenu();
        handleOpen();
    };

    const handleLogout = () => {
        localStorage.removeItem("userInfo");
        navigate("/");
    };

    return (
        <>
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="user avatar" src={user.pic} />
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    <MenuItem onClick={handleProfileMenu}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </Box>
            <ProfileModal open={open} setOpen={setOpen} user={user} />
        </>
    );
};
