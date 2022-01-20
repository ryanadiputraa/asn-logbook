import jsPDF from "jspdf";
import autoTable, { RowInput } from "jspdf-autotable";
import {
  formatReportDate,
  getLastDayDate,
} from "../../helper/formatReportDate";

import { DailyLog, ProfileData } from "../../modules/main/pages/Main";

export const convertPdfReport = (
  profileData: ProfileData,
  reportDate: string,
  logs: DailyLog[]
) => {
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
  logs.forEach((log, idx) => {
    tableData = [String(idx + 1), log.day, log.activites];
    tableBody.push(tableData);
  });
  autoTable(doc, {
    styles: { halign: "center", fontSize: 12 },
    startY: 4.5,
    head: [["No,", "Hari", "Urairan Kegiatan", "Validasi Pimpinan"]],
    body: tableBody,
  });

  doc.save(formatReportDate(reportDate));
};
