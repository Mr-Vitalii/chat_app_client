import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";


const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [selectedChat, setSelectedChat] = useState();
    const [user, setUser] = useState();
    const [notification, setNotification] = useState([]);
    const [chats, setChats] = useState();


    const isMobile = useMediaQuery("(max-width:760px)");

    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);

        if (!userInfo) navigate("/");

    }, [navigate]);


    return (
        <ChatContext.Provider value={{
            user,
            setUser,
            selectedChat,
            setSelectedChat,
            chats,
            setChats,
            notification,
            setNotification,
            isMobile
        }}>

            {children}
        </ChatContext.Provider>
    )
}

export const ChatState = () => {
    return useContext(ChatContext);
};
