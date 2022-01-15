import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import auth from "../auth";
import { Button, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { ModalProps } from "../../modal";

type Inputs = {
  nip: string;
  password: string;
};

interface LoginProps {
  setModal: React.Dispatch<React.SetStateAction<ModalProps>>;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Login: React.FC<LoginProps> = ({ setModal }) => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setModal({ isOpen: true, type: "Loader" });
    auth
      .login(data)
      .then(() => {
        setModal({ isOpen: false, type: "" });
        navigate("/");
      })
      .catch(() => {
        setModal({ isOpen: false, type: "" });
        setErrorMsg("Gagal login! Mohon periksa kembali NIP dan Password anda");
        setIsError(true);
      });
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setIsError(false);
  };

  return (
    <Stack
      direction="column"
      spacing={4}
      sx={{
        background: "url(/background.jpeg) center/cover no-repeat",
        backgroundPositionY: "-35vh",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        px: "2vw",
      }}
    >
      <Typography
        component="h1"
        variant="h3"
        color="secondary"
        sx={{ marginBottom: "2vh" }}
      >
        ASN LogBook
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Stack
          direction="column"
          spacing={3}
          sx={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              label="NIP"
              variant="standard"
              {...register("nip", { required: true })}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LockIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              label="Password"
              variant="standard"
              {...register("password", { required: true })}
            />
          </Box>
          <Button type="submit" color="primary" variant="contained">
            Login
          </Button>
        </Stack>
      </form>

      <Link to="/">Kembali ke Halaman Utama</Link>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={isError}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMsg}
        </Alert>
      </Snackbar>
    </Stack>
  );
};
