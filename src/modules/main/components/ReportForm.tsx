import React, { useState } from "react";
import { LogList } from "./LogList";
import { DailyLog, ProfileData } from "../pages/Main";
import { ModalProps } from "../../modal";
import { Button, Paper, TextField, Typography, Stack } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { convertPdfReport } from "../../../lib/jspdf/convertPdfReport";

interface ReportFormProps {
  setReportDate: React.Dispatch<React.SetStateAction<string>>;
  logs: DailyLog[];
  onAddLog: (log: DailyLog) => void;
  onRemoveLog: (key: number) => void;
  profileData: ProfileData;
  reportDate: string;
  setIsNotify: React.Dispatch<React.SetStateAction<boolean>>;
  setNotifyMsg: React.Dispatch<React.SetStateAction<string>>;
  setModal: React.Dispatch<React.SetStateAction<ModalProps>>;
}

export const ReportForm: React.FC<ReportFormProps> = ({
  setReportDate,
  logs,
  onAddLog,
  onRemoveLog,
  profileData,
  reportDate,
  setIsNotify,
  setNotifyMsg,
  setModal,
}) => {
  const [key, setKey] = useState(1);
  const [day, setDay] = useState("Senin");
  const [activities, setActivities] = useState("");

  const onSubmitLogForm = (event?: React.SyntheticEvent | Event) => {
    event?.preventDefault();
    const newLog: DailyLog = {
      key: key,
      day: day,
      activites: activities,
    };
    setKey(key + 1);
    onAddLog(newLog);
  };

  const onPrintPdf = () => {
    setModal({ isOpen: true, type: "Loader" });
    convertPdfReport(profileData, reportDate, logs);
    setModal({ isOpen: false, type: "" });
    setNotifyMsg("PDF berhasil didownload!");
    setIsNotify(true);
  };

  return (
    <>
      <div>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Tanggal Laporan :
        </Typography>
        <TextField
          value={reportDate}
          type="date"
          variant="outlined"
          onChange={(event) => {
            setReportDate(event.target.value);
            window.localStorage.setItem(
              "asn-logbook-reportdate",
              event.target.value
            );
          }}
        />
      </div>
      <LogList
        logs={logs}
        onRemoveLog={onRemoveLog}
        currentKey={key}
        setKey={setKey}
      />
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
        <form
          onSubmit={(event) => onSubmitLogForm(event)}
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
            <Typography variant="h6">Laporan</Typography>
            <FormControl sx={{ width: "50%" }}>
              <InputLabel id="demo-simple-select-label">Hari</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={day}
                label="Hari"
                onChange={(event) => setDay(event.target.value)}
              >
                <MenuItem value={"Senin"}>Senin</MenuItem>
                <MenuItem value={"Selasa"}>Selasa</MenuItem>
                <MenuItem value={"Rabu"}>Rabu</MenuItem>
                <MenuItem value={"Kamis"}>Kamis</MenuItem>
                <MenuItem value={"Jumat"}>Jumat</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Uraian Kegiatan"
              variant="outlined"
              multiline
              rows={8}
              sx={{ width: "80%" }}
              onChange={(event) => setActivities(event.target.value)}
            />
            <Button type="submit" color="primary" variant="contained">
              Tambah
            </Button>
          </Stack>
        </form>
      </Paper>
      <Button variant="contained" color="error" onClick={onPrintPdf}>
        Cetak PDF
      </Button>
    </>
  );
};
