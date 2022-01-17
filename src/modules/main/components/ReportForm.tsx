import React, { useState } from "react";

import { LogList } from "./LogList";
import { DailyLog } from "../pages/Main";
import { Button, Paper, TextField, Typography, Stack } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

interface ReportFormProps {
  setReportDate: React.Dispatch<React.SetStateAction<string>>;
  logs: DailyLog[];
  onAddLog: (log: DailyLog) => void;
}

export const ReportForm: React.FC<ReportFormProps> = ({
  setReportDate,
  logs,
  onAddLog,
}) => {
  const [day, setDay] = useState("Senin");
  const [activities, setActivities] = useState("");

  const onSubmitLogForm = (event?: React.SyntheticEvent | Event) => {
    event?.preventDefault();
    const newLog: DailyLog = {
      day: day,
      activites: activities,
    };
    onAddLog(newLog);
  };

  return (
    <>
      <div>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Tanggal Laporan :
        </Typography>
        <TextField
          type="date"
          variant="outlined"
          onChange={(event) => setReportDate(event.target.value)}
        />
      </div>
      <LogList logs={logs} />
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
    </>
  );
};
