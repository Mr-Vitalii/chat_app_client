import React, { useEffect, useState } from "react";
import axios from "axios";
import { chatRoute } from "../utils/APIRoutes";
import { ChatState } from "context/ChatProvider";

import { Box } from "@mui/material";
import { SideDrawer } from "components/global/SideDrawer/SideDrawer";
import { MyChats } from "components/MyChats/MyChats";
import { Chatbox } from "components/Chatbox/Chatbox";

export const ChatPage = () => {
    const { user } = ChatState();

    return (
        <div style={{ width: "100%" }}>
            {user && <SideDrawer />}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    height: "91.5vh",
                    p: "10px",
                }}
            >
                {user && <MyChats />}
                {user && <Chatbox />}
            </Box>
            {/* <Box>{user && <MyChats fetchAgain={fetchAgain} />}</Box> */}
            {/* <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box> */}
        </div>
    );
};
