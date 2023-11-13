import { styled } from "@mui/material/styles";
import { Box, ListItem } from "@mui/material";
import { colors } from "theme";

export const Container = styled(Box)(({ theme }) => ({
    margin: "auto",
    maxWidth: "550px",
    backgroundColor: theme.palette.borderColor.main,
    padding: "20px",
}));

export const StyledBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    rowGap: "5px",
});

export const DropContainer = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    minHeight: "150px",
    textAlign: "center",
    cursor: "pointer",
    border: `2px dashed ${colors.secondary[500]}`,
    transition: "border 0.3s ease",
    "&:hover": {
        borderColor: colors.blueAccent[500],
    },
});

export const FilePreview = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",

    "& img": {
        width: "80px",
        height: "80px",
        objectFit: "cover",
        border: `1px solid ${colors.secondary[500]}`,
        borderRadius: "5px",
    },
}));

export const RejectedFiles = styled(Box)({
    marginTop: "15px",
    marginBottom: "15px",
});

export const DeleteButton = styled("button")(({ theme }) => ({
    marginTop: "5px",
    backgroundColor: colors.redAccent[500],
    color: theme.palette.common.white,
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",

    "&:hover": {
        backgroundColor: colors.redAccent[300],
    },
    [theme.breakpoints.down("md")]: {
        marginTop: "10px",
    },
}));

export const StyledListItem = styled(ListItem, {
    shouldForwardProp: (prop) => prop !== "key",
})(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    backgroundColor: theme.palette.secondaryBackground.main,
    color: colors.redAccent[300],
    [theme.breakpoints.down("md")]: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
}));

export const ErrorsContainer = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
}));
