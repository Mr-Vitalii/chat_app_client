import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    InputBase,
    Badge,
    MenuItem,
    Menu,
    Tooltip,
    Button,
    useTheme,
    Drawer,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { MobileMenu } from "./Menu/MobileMenu";
import { NotificationMenu } from "./Menu/NotificationMenu";
import { ChatState } from "context/ChatProvider";
import { UserMenu } from "./Menu/UserMenu";
import { SideBar } from "../SideBar/SideBar";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));

export const Navbar = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const theme = useTheme();
    const { user } = ChatState();

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

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const menuId = "primary-notification-menu";
    const mobileMenuId = "primary-notification-menu-mobile";

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar sx={{ justifyContent: "space-between" }}>
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

                        {/* <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ "aria-label": "search" }}
                        />
                    </Search> */}
                        {/* <Box sx={{ flexGrow: 1 }} /> */}
                        <Box sx={{ display: { xs: "none", md: "flex" } }}>
                            <IconButton
                                size="large"
                                aria-label="show 4 new mails"
                                color="inherit"
                            >
                                <Badge badgeContent={4} color="error">
                                    <MailIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                size="large"
                                aria-label="notifications"
                                color="inherit"
                                onClick={handleNotificationMenuOpen}
                            >
                                <Badge badgeContent={17} color="error">
                                    <NotificationsIcon />
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
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                <MobileMenu
                    mobileMoreAnchorEl={mobileMoreAnchorEl}
                    mobileMenuId={mobileMenuId}
                    isMobileMenuOpen={isMobileMenuOpen}
                    handleMobileMenuClose={handleMobileMenuClose}
                />
            </Box>

            <SideBar
                openSideBar={openSideBar}
                setOpenSideBar={setOpenSideBar}
                toggleDrawer={toggleDrawer}
            />
        </>
    );
};
