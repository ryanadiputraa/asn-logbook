import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
// import axios from "../../../lib/axios/axios";
import auth from "../../auth/auth";

import { ProfileForm } from "../components/ProfileForm";
import { ReportForm } from "../components/ReportForm";
import { ModalProps } from "../../modal";
import { MenuBar } from "../components/MenuBar";
import { Box } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export type ProfileData = {
  fullname: string;
  nip: string;
  position: string;
  supervisor: string;
  supervisor_position: string;
  city: string;
};

export interface DailyLog {
  key: number;
  day: string;
  activites: string;
}
interface MainProps {
  setModal: React.Dispatch<React.SetStateAction<ModalProps>>;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Main: React.FC<MainProps> = ({ setModal }) => {
  const navigate = useNavigate();
  const [isAuth] = useState(false);
  const [isNotify, setIsNotify] = useState(false);
  const [notifyMsg, setNotifyMsg] = useState("");

  const [profileData, setProfileData] = useState<ProfileData>({
    fullname: "",
    nip: "",
    position: "",
    supervisor: "",
    supervisor_position: "",
    city: "",
  });
  const [reportDate, setReportDate] = useState<string>("");
  const [log, setLog] = useState<DailyLog[]>([]);

  const { register, handleSubmit } = useForm<ProfileData>();

  const onSaveProfile: SubmitHandler<ProfileData> = (data) => {
    setNotifyMsg("Data berhasil disimpan! Silahkan isi laporan anda");
    setIsNotify(true);
    setProfileData(data);
  };

  const onAddLog = (log: DailyLog) => {
    setLog((currentLog) => [...currentLog, log]);
  };

  const onRemoveLog = (key: number) => setLog(log.filter((l) => l.key !== key));

  const handleLogout = () => {
    auth.logout(() => navigate("/login"));
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setIsNotify(false);
  };

  // useEffect(() => {
  // setModal({ isOpen: true, type: "Loader" });
  // axios
  //   .get("/api/v1/profile")
  //   .then((resp) => {
  //     setModal({ isOpen: false, type: "" });
  //     setIsAuth(true);
  //   })
  //   .catch((err) => {
  //     setModal({ isOpen: false, type: "" });
  //     console.error(err);
  //     setIsAuth(false);
  //   });
  // }, []); // eslint-disable-line

  return (
    <>
      <MenuBar
        isAuth={isAuth}
        handleLogout={handleLogout}
        navigate={navigate}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2vh 2vh 6vh 2vh",
          gap: "2vh",
        }}
      >
        {!profileData["nip"] ? (
          <ProfileForm
            register={register}
            handleSubmit={handleSubmit}
            onSaveProfile={onSaveProfile}
          />
        ) : null}
        <ReportForm
          setReportDate={setReportDate}
          logs={log}
          onAddLog={onAddLog}
          onRemoveLog={onRemoveLog}
          profileData={profileData}
          reportDate={reportDate}
          setIsNotify={setIsNotify}
          setNotifyMsg={setNotifyMsg}
          setModal={setModal}
        />
      </Box>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={isNotify}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {notifyMsg}
        </Alert>
      </Snackbar>
    </>
  );
};
