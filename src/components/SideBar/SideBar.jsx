import { useState } from "react";

import {
    Box,
    SwipeableDrawer,
    Button,
    List,
    Divider,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    TextField,
} from "@mui/material";

import CircularProgress from "@mui/material/CircularProgress";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ChatState } from "context/ChatProvider";

import { AppButton } from "components/global/AppButton/AppButton";

import { instance, instanceAuth, setAuthHeader } from "utils/axios";
import { ChatLoading } from "../ChatLoading/ChatLoading";
import { UserListItem } from "../UserAvatar/UserListItem";
import { LoadingComponent } from "../LoadingComponent/LoadingComponent";

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

            console.log(data);

            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast.error("Failed to Load the Search Results", toastOptions);
        }
    };

    const accessChat = async (userId) => {
        console.log(userId);

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

    const list = () => (
        <Box
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {["Inbox", "Starred", "Send email", "Drafts"].map(
                    (text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? (
                                        <InboxIcon />
                                    ) : (
                                        <MailIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ),
                )}
            </List>
            <Divider />
            <List>
                {["All mail", "Trash", "Spam"].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <SwipeableDrawer
                anchor="left"
                open={openSideBar}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                {/* {list()} */}
                <Box sx={{ width: "250", p: isMobile ? 1 : 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <TextField
                            id="outlined-basic"
                            label="Outlined"
                            variant="outlined"
                            placeholder="Search by name or email"
                            sx={{ mr: 2 }}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            /* onClick={handleSearch} */
                            onClick={handleSearch}
                        >
                            Go
                        </Button>
                    </Box>
                    {loading ? (
                        <ChatLoading />
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
            <ToastContainer />
        </div>
    );
};
