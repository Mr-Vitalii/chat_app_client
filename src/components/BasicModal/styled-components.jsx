import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { colors } from "theme";

export const BoxStyled = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    [theme.breakpoints.up("md")]: {
        width: 560,
    },
    backgroundColor: theme.palette.borderColor.main,
    border: "2px solid #000",
    boxShadow: 24,
    padding: "20px",
}));
