import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../lib/axios/axios";
import auth from "../../auth/auth";

import { MenuBar } from "../components/MenuBar";

export const Main: React.FC = () => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  const handleLogout = () => {
    auth.logout(() => navigate("/login"));
  };

  useEffect(() => {
    axios
      .get("/api/v1/profile")
      .then((resp) => {
        console.log(resp.data);
        setIsAuth(true);
      })
      .catch((err) => {
        console.info("not logged in");
        setIsAuth(false);
      });
  }, []);

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
