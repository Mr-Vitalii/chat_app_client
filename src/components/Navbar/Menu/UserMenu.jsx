import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Avatar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
    useTheme,
} from "@mui/material";
import { ChatState } from "context/ChatProvider";
import { ProfileModal } from "components/modal/ProfileModal/ProfileModal";

export const UserMenu = ({
    handleOpenUserMenu,
    anchorElUser,
    handleCloseUserMenu,
}) => {
    const { user } = ChatState();

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    const theme = useTheme();

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
                        <Avatar
                            alt="user avatar"
                            src={user.pic}
                            sx={{
                                [theme.breakpoints.up("md")]: {
                                    width: "60px",
                                    height: "60px",
                                },
                            }}
                        />
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
