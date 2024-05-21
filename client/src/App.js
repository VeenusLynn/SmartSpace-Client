import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "./scenes/layout";
import Dashboard from "./scenes/dashboard";
import Login from "scenes/login";
import Register from "scenes/register";
import Report from "scenes/report";
import Warehouse from "scenes/warehouse";
import Inventory from "scenes/inventory";
import VideoProcessing from "scenes/videoProcessing";
import ControlPanel from "scenes/controlPanel";
import FAQ from "scenes/faq";
import BugReport from "scenes/bugReports";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/reports" element={<Report />} />
              <Route path="/warehouse" element={<Warehouse />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/videoprocessing" element={<VideoProcessing />} />
              <Route path="/controlpanel" element={<ControlPanel />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/bugreports" element={<BugReport />} />
            </Route>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
