import { styled } from "@mui/material/styles";
import { colors } from "theme";

export const Backdrop = styled("div")(({ theme }) => ({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 1000,
}));

export const Content = styled("div")(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "300px",
    minHeight: "300px",
    padding: "30px",
    backgroundColor: theme.palette.borderColor.main,
    borderRadius: "4px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2), 0 16px 20px rgba(0, 0, 0, 0.2)",
}));

export const CloseButton = styled("button")(({ theme }) => ({
    position: "absolute",
    top: "2px",
    right: "2px",
    backgroundColor: "transparent",
    color: colors.blueAccent[500],
    fontSize: "20px",
    fontWeight: "bold",
    border: "none",
    transition: "0.3s",
    cursor: "pointer",

    "&:hover, &:focus": {
        color: colors.blueAccent[500],
    },
}));
