import React from "react";

import { DailyLog } from "../pages/Main";
import { Box, Paper, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export interface LogListProps {
  logs: DailyLog[];
  onRemoveLog: (key: number) => void;
  currentKey: number;
  setKey: React.Dispatch<React.SetStateAction<number>>;
}

export const LogList: React.FC<LogListProps> = ({
  logs,
  onRemoveLog,
  currentKey,
  setKey,
}) => {
  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{
        alignItems: "center",
        justifyContent: "center",
        width: "95%",
        maxWidth: "80vh",
      }}
    >
      {logs.map((log: DailyLog) => (
        <Paper
          key={log.key}
          elevation={5}
          sx={{
            background: "#5c6bc0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "2vh",
            width: "90%",
          }}
        >
          <Typography
            variant="body1"
            color="secondary"
            sx={{ fontWeight: 700 }}
          >
            {log.day}
          </Typography>
          <Box sx={{ width: "70%" }}>
            <Typography
              variant="body2"
              color="secondary"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {log.activites}
            </Typography>
          </Box>
          <CloseIcon
            color="secondary"
            sx={{ cursor: "pointer" }}
            onClick={() => {
              onRemoveLog(log.key);
              setKey(currentKey - 1);
            }}
          />
        </Paper>
      ))}
    </Stack>
  );
};
