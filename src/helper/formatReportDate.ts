const monthInId: any = {
  1: "Januari",
  2: "Februari",
  3: "Maret",
  4: "April",
  5: "Mei",
  6: "Juni",
  7: "Juli",
  8: "Agustus",
  9: "September",
  10: "Oktober",
  11: "November",
  12: "Desember",
};

export const getLastDayOfTheWeek = (reportDate: string): number => {
  const newDate = reportDate.split("-").reverse();
  return Number(newDate[0]) + 4;
};

export const formatReportDate = (reportDate: string): string => {
  let newDate = reportDate.split("-").reverse();
  const month: number = Number(newDate[1]);
  newDate[1] = monthInId[month];
  newDate.splice(1, 0, `- ${getLastDayOfTheWeek(reportDate)}`);
  return newDate.join(" ");
};

export const getLastDayDate = (reportDate: string): string => {
  let newDate = reportDate.split("-").reverse();
  const month: number = Number(newDate[1]);
  newDate[1] = monthInId[month];
  return newDate.join(" ");
};
