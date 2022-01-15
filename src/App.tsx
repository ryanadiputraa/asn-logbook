import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./lib/material-ui/theme";

import { Main } from "./modules/main/pages/Main";
import { Login } from "./modules/auth/pages/Login";
import { Register } from "./modules/auth/pages/Register";
import { Modal, ModalProps } from "./modules/modal/index";

export const App = () => {
  const [modal, setModal] = useState<ModalProps>({
    isOpen: false,
    type: "",
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Main setModal={setModal} />} />
          <Route path="/login" element={<Login setModal={setModal} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
      <Modal isOpen={modal.isOpen} type={modal.type} />
    </ThemeProvider>
  );
};
