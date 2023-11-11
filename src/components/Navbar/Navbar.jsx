import { useState } from "react";

import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Badge,
    Tooltip,
    Button,
    useTheme,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import MailIcon from "@mui/icons-material/Mail";

import { NotificationMenu } from "./Menu/NotificationMenu";
import { ChatState } from "context/ChatProvider";
import { UserMenu } from "./Menu/UserMenu";
import { SideBar } from "../SideBar/SideBar";

export const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const [anchorElUser, setAnchorElUser] = useState(null);

    const isMenuOpen = Boolean(anchorEl);

    const theme = useTheme();
    const { notification } = ChatState();

    const [openSideBar, setOpenSideBar] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setOpenSideBar(open);
    };

    const handleNotificationMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const menuId = "primary-notification-menu";

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar
                        sx={{
                            justifyContent: "space-between",
                        }}
                    >
                        <Tooltip
                            title="Search Users to chat"
                            placement="top-start"
                        >
                            <Button
                                size="large"
                                edge="start"
                                color="inherit"
                                component="label"
                                variant="contained"
                                sx={{ mr: 2 }}
                                startIcon={<SearchIcon />}
                                onClick={() => setOpenSideBar(true)}
                            >
                                <Typography
                                    sx={{
                                        display: "flex",
                                        [theme.breakpoints.down("sm")]: {
                                            display: "none",
                                        },
                                    }}
                                >
                                    Search User
                                </Typography>
                            </Button>
                        </Tooltip>
                        <Typography
                            variant="h4"
                            component="div"
                            noWrap
                            sx={{
                                fontFamily: "Work sans",
                                display: { xs: "none", sm: "block" },
                            }}
                        >
                            Keep in touch
                        </Typography>

                        <Box sx={{ display: { xs: "none", md: "flex" } }}>
                            <IconButton
                                size="large"
                                aria-label="notifications"
                                color="inherit"
                                onClick={handleNotificationMenuOpen}
                            >
                                <Badge
                                    badgeContent={notification.length}
                                    color="error"
                                >
                                    <MailIcon />
                                </Badge>
                            </IconButton>
                            <NotificationMenu
                                anchorEl={anchorEl}
                                menuId={menuId}
                                isMenuOpen={isMenuOpen}
                                handleMenuClose={handleMenuClose}
                            />
                            <UserMenu
                                handleOpenUserMenu={handleOpenUserMenu}
                                anchorElUser={anchorElUser}
                                handleCloseUserMenu={handleCloseUserMenu}
                            />
                        </Box>
                        <Box sx={{ display: { xs: "flex", md: "none" } }}>
                            <IconButton
                                size="large"
                                aria-label="notifications"
                                color="inherit"
                                onClick={handleNotificationMenuOpen}
                            >
                                <Badge
                                    badgeContent={notification.length}
                                    color="error"
                                >
                                    <MailIcon />
                                </Badge>
                            </IconButton>
                            <UserMenu
                                handleOpenUserMenu={handleOpenUserMenu}
                                anchorElUser={anchorElUser}
                                handleCloseUserMenu={handleCloseUserMenu}
                            />
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            <SideBar
                openSideBar={openSideBar}
                setOpenSideBar={setOpenSideBar}
                toggleDrawer={toggleDrawer}
            />
        </>
    );
};
