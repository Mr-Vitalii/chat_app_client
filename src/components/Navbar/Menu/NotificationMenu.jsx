import { Menu, MenuItem } from "@mui/material";

import { ChatState } from "context/ChatProvider";
import { getSender } from "config/ChatLogics";

export const NotificationMenu = ({
    anchorEl,
    menuId,
    isMenuOpen,
    handleMenuClose,
}) => {
    const { user, setSelectedChat, notification, setNotification } =
        ChatState();

    const notificationHandler = (notif) => {
        if (!notif) return;

        setSelectedChat(notif.chat);

        setNotification(
            notification.filter((n) => n.chat._id !== notif.chat._id),
        );
    };

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
            {!notification.length && <MenuItem>No New Messages</MenuItem>}
            {notification.map((notif) => (
                <MenuItem
                    key={notif._id}
                    onClick={() => notificationHandler(notif)}
                >
                    {notif.chat.isGroupChat
                        ? `New Message in ${notif.chat.chatName}`
                        : `New Message from ${getSender(
                              user,
                              notif.chat.users,
                          )}`}
                </MenuItem>
            ))}
        </Menu>
    );
};
