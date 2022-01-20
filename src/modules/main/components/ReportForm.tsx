import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable, { RowInput } from "jspdf-autotable";

import { LogList } from "./LogList";
import { DailyLog, ProfileData } from "../pages/Main";
import { ModalProps } from "../../modal";
import {
  formatReportDate,
  getLastDayDate,
} from "../../../helper/formatReportDate";
import { Button, Paper, TextField, Typography, Stack } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "cm",
      format: "a4",
    });
    const title = "LAPORAN KEGIATAN HARIAN ASN";
    const xOffsetCenter =
      (doc.internal.pageSize.getWidth() - doc.getTextWidth(title)) / 2;
    doc.setFontSize(16);
    doc.text(title, xOffsetCenter, 1);

    doc.setFontSize(12);
    doc.text(`Tamggal Laporan  \t\t: ${formatReportDate(reportDate)}`, 1.5, 2);
    doc.text(
      `Nama / NIP   \t\t\t: ${profileData.fullname} / ${profileData.nip}`,
      1.5,
      2.5
    );
    doc.text(`Jabatan \t\t\t\t: ${profileData.position}`, 1.5, 3);
    doc.text(`Nama atasan langsung \t: ${profileData.supervisor}`, 1.5, 3.5);
    doc.text(
      `Jabatan atasan langsung      : ${profileData.supervisor_position}`,
      1.5,
      4
    );

    doc.text(`${profileData.city}, ${getLastDayDate(reportDate)}`, 14, 25.5);
    doc.setFontSize(10);
    doc.text("Pembuat laporan", 14, 26);
    doc.setFontSize(12);
    doc.text(profileData.fullname, 14, 28.5);
    doc.text(`Nip.${profileData.nip}`, 14, 29);

    let tableBody: RowInput[] = [];
    let tableData: RowInput = [];
    logs.forEach((log) => {
      tableData = [String(log.key), log.day, log.activites];
      tableBody.push(tableData);
    });
    autoTable(doc, {
      styles: { halign: "center", fontSize: 12 },
      startY: 4.5,
      head: [["No,", "Hari", "Urairan Kegiatan", "Validasi Pimpinan"]],
      body: tableBody,
    });

    doc.save(formatReportDate(reportDate));
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
          type="date"
          variant="outlined"
          onChange={(event) => setReportDate(event.target.value)}
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
