import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { colors } from "theme";

export const LoadingComponent = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: colors.secondary[900],
                width: "100vw",
                height: "100vh",
                padding: "20px",
            }}
        >
            <CircularProgress color={"primary"} />
        </Box>
    );
};
