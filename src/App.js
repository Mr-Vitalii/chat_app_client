import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ChatPage } from 'pages/ChatPage';
import { AuthPage } from 'pages/AuthPage';

import { useMode } from "theme";
import { ColorModeContext } from "theme/context";
import { ThemeProvider } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';

import { ToastContainer } from "react-toastify";

function App() {
  const [theme, colorMode] = useMode()
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <div className="App">
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
          <ToastContainer />
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
