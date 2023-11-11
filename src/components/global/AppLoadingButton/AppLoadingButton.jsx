import { styled } from "@mui/material/styles";
import { Theme } from "@mui/material";
import { colors } from "theme";

import LoadingButton from "@mui/lab/LoadingButton";

export const AppLoadingButton = styled(LoadingButton)(({ theme }) => ({
    borderRadius: "4px",
    backgroundColor: colors.secondary[500],
    boxShadow: `0px 1px 7px ${colors.secondary[700]}`,
    padding: "10px 20px",
    minWidth: "185px",
    maxWidth: "300px",
    color: theme.palette.common.white,
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
