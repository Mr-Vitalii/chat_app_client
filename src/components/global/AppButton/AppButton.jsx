import { styled } from "@mui/material/styles";
import { colors } from "theme";
import { Button } from "@mui/material";

export const AppButton = styled(Button)(({ theme }) => ({
    borderRadius: "4px",
    backgroundColor: colors.secondary[500],
    boxShadow: `0px 1px 7px ${colors.secondary[700]}`,
    padding: "10px 20px",
    minWidth: "185px",
    maxWidth: "300px",
    color: theme.palette.common.white,
    [theme.breakpoints.down("lg")]: {
        fontSize: "12px",
        padding: "8px 10px",
    },
    transition: "box-shadow 0.3s",

    "&:hover": {
        backgroundColor: colors.secondary[400],
        boxShadow: `0px 1px 20px ${colors.secondary[400]}`,
    },
    "&:disabled": {
        backgroundColor: colors.secondary[500],
        boxShadow: "none",
    },
}));
