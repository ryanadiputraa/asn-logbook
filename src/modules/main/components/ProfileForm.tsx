import React from "react";
import {
  UseFormRegister,
  UseFormHandleSubmit,
  SubmitHandler,
} from "react-hook-form";
import { profileData } from "../pages/Main";

import { Button, Paper, Stack, Typography, TextField } from "@mui/material";

interface ProfileFormInterface {
  register: UseFormRegister<profileData>;
  handleSubmit: UseFormHandleSubmit<profileData>;
  onSaveProfile: SubmitHandler<profileData>;
}

export const ProfileForm: React.FC<ProfileFormInterface> = ({
  register,
  handleSubmit,
  onSaveProfile,
}) => {
  return (
    <Paper
      elevation={4}
      sx={{
        width: "95%",
        maxWidth: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2vh 0",
      }}
    >
      <Typography variant="h6">Data ASN</Typography>
      <form
        onSubmit={handleSubmit(onSaveProfile)}
        autoComplete="off"
        style={{ width: "100%" }}
      >
        <Stack
          direction="column"
          spacing={2}
          sx={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            label="Nama Lengkap"
            variant="standard"
            sx={{ width: "80%" }}
            {...register("fullname", { required: true })}
          />
          <TextField
            label="NIP"
            variant="standard"
            sx={{ width: "80%" }}
            {...register("nip", { required: true })}
          />
          <TextField
            label="Jabatan"
            variant="standard"
            sx={{ width: "80%" }}
            {...register("position", { required: true })}
          />
          <TextField
            label="Nama Atasan Langsung"
            variant="standard"
            sx={{ width: "80%" }}
            {...register("supervisor", { required: true })}
          />
          <TextField
            label="Jabatan Atasan Langsung"
            variant="standard"
            sx={{ width: "80%" }}
            {...register("supervisor_position", { required: true })}
          />
          <TextField
            label="Kota"
            variant="standard"
            sx={{ width: "80%" }}
            {...register("city", { required: true })}
          />
          <Button type="submit" color="primary" variant="contained">
            Simpan
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};
