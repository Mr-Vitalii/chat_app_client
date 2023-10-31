import { Box, Button, Tooltip, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import { BoxContainer } from "./styled-components";
import { Navbar } from "../../Navbar/Navbar";

export const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(true);

    const theme = useTheme();

    return (
        <>
            <Navbar />
            {/* <BoxContainer>
                <Tooltip title="Search Users to chat" placement="top-start">
                    <Button
                        component="label"
                        variant="contained"
                        startIcon={<SearchIcon />}
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
                <Typography variant="h4" sx={{ fontFamily: "Work sans" }}>
                    Keep in touch
                </Typography>
            </BoxContainer> */}
        </>
    );
};
