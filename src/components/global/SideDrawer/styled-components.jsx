import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { colors } from "theme";

export const BoxContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "red",
    width: "100%",
    padding: "5px 10px 5px 10px",
    borderWidth: "5px",
}));
