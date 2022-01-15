import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../lib/axios/axios";
import auth from "../../auth/auth";

import { ModalProps } from "../../modal";
import { MenuBar } from "../components/MenuBar";

interface MainProps {
  setModal: React.Dispatch<React.SetStateAction<ModalProps>>;
}

export const Main: React.FC<MainProps> = ({ setModal }) => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  const handleLogout = () => {
    auth.logout(() => navigate("/login"));
  };

  useEffect(() => {
    setModal({ isOpen: true, type: "Loader" });
    axios
      .get("/api/v1/profile")
      .then((resp) => {
        setModal({ isOpen: false, type: "" });
        setIsAuth(true);
      })
      .catch((err) => {
        setModal({ isOpen: false, type: "" });
        console.error(err);
        setIsAuth(false);
      });
  }, []); // eslint-disable-line

  return (
    <>
      <MenuBar
        isAuth={isAuth}
        handleLogout={handleLogout}
        navigate={navigate}
      />
    </>
  );
};
