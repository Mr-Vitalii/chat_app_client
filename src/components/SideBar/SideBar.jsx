import { useState } from "react";

import {
    Box,
    SwipeableDrawer,
    Button,
    TextField,
    IconButton,
    useTheme,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { ChatState } from "context/ChatProvider";
import { instance, instanceAuth, setAuthHeader } from "utils/axios";

import { ChatLoading } from "components/global/ChatLoading/ChatLoading";
import { UserListItem } from "components/UserListItem/UserListItem";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { colors } from "theme";

export const SideBar = ({ openSideBar, setOpenSideBar, toggleDrawer }) => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);

    const toastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const theme = useTheme();

    const { user, setSelectedChat, chats, setChats, isMobile } = ChatState();

    const handleSearch = async () => {
        if (!search) {
            toast.warning("Please Enter something in search", toastOptions);
            return;
        }

        try {
            setLoading(true);

            setAuthHeader(user.token);

            const { data } = await instanceAuth.get(
                `user/users?search=${search}`,
            );

            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast.error("Failed to Load the Search Results", toastOptions);
        }
    };

    const accessChat = async (userId) => {
        try {
            setLoadingChat(true);
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await instance.post(`chat`, { userId }, config);

            if (!chats.find((c) => c._id === data._id))
                setChats([data, ...chats]);

            setSelectedChat(data);
            setLoadingChat(false);
            setOpenSideBar(false);
        } catch (error) {
            console.log(error);
            toast.error("Error fetching the chat", toastOptions);
        }
    };

    const handleDrawerClose = () => {
        setOpenSideBar(false);
    };

    return (
        <div>
            <SwipeableDrawer
                anchor="left"
                open={openSideBar}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                sx={{
                    "& .MuiDrawer-paper": {
                        backgroundColor: colors.primaryDarkTheme[500],
                        backgroundImage: "none",
                    },
                }}
            >
                <Box
                    sx={{
                        width: isMobile ? "100vw" : "400px",
                        p: isMobile ? 1 : 3,
                        backgroundColor: colors.primaryDarkTheme[500],
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: isMobile
                                ? "space-between"
                                : "start",
                            alignItems: "center",
                            mb: 2,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <TextField
                                color="secondary"
                                autoComplete="off"
                                id="outlined-basic"
                                label="Outlined"
                                variant="outlined"
                                placeholder="Search by name or email"
                                sx={{ mr: 2 }}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button
                                color="secondary"
                                variant="contained"
                                onClick={handleSearch}
                            >
                                Go
                            </Button>
                        </Box>

                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === "ltr" ? (
                                <ChevronLeftIcon />
                            ) : (
                                <ChevronRightIcon />
                            )}
                        </IconButton>
                    </Box>
                    {loading ? (
                        <ChatLoading sx={{ m: "auto" }} />
                    ) : (
                        searchResult?.map((searchUser) => (
                            <UserListItem
                                key={searchUser._id}
                                searchUser={searchUser}
                                handleFunction={() =>
                                    accessChat(searchUser._id)
                                }
                            />
                        ))
                    )}
                    {loadingChat && (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <CircularProgress color={"secondary"} />
                        </Box>
                    )}
                </Box>
            </SwipeableDrawer>
        </div>
    );
};
