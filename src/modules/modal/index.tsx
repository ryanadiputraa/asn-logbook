import React from "react";
import Dialog from "@mui/material/Dialog";

import { Loader } from "./Loader";

const modalList = {
  "": null,
  Loader,
};

type modalType = "" | "Loader";

export interface ModalProps {
  isOpen: boolean;
  type: modalType;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, type }) => {
  const Content = modalList[type];

  return (
    <Dialog
      open={isOpen}
      PaperProps={
        type === "Loader"
          ? {
              sx: {
                background: "transparent",
                overflow: "visible",
                boxShadow: "none",
              },
            }
          : {}
      }
    >
      {Content ? <Content /> : null}
    </Dialog>
  );
};
