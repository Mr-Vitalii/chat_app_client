import React, { useEffect, useState } from "react";
import axios from "axios";
import { chatRoute } from "../utils/APIRoutes";

export const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const fetchChats = async () => {
    const response = await axios.get(chatRoute);
    console.log(response.data.chats);
    setChats(response.data.chats);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div>
      {chats.map((chat) => (
        <div key={chat._id}>{chat.chatName}</div>
      ))}
    </div>
  );
};
