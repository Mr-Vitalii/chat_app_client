import React, { useState } from "react";
import { Box, Tab, Typography } from "@mui/material";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { StyledContainer } from "./styled-components";
import { Login } from "./Login/Login";
import { Register } from "./Register/Register";

export const Auth = () => {
    const [value, setValue] = useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <StyledContainer maxWidth="xl">
            <Box>
                <Typography>Vitto</Typography>
            </Box>
            <Box>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList
                            scrollButtons
                            allowScrollButtonsMobile
                            onChange={handleChange}
                            aria-label="Settings tabs"
                            centered
                            textColor="secondary"
                            TabIndicatorProps={{
                                style: {
                                    backgroundColor: "red",
                                },
                            }}
                        >
                            <Tab label="Sing in" value="1" />
                            <Tab label="Sing up" value="2" />
                        </TabList>
                    </Box>

                    <TabPanel value="1">
                        <Login />
                    </TabPanel>
                    <TabPanel value="2">
                        <Register />
                    </TabPanel>
                </TabContext>
            </Box>
        </StyledContainer>
    );
};
