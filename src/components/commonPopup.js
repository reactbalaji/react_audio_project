
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

export const CommonPopup = (props) => {
    console.log(props,"props")
  return (
    <>
      <Dialog
        open={props.popup}
        maxWidth={props?.width ? props.width : undefined}
      >
        <DialogTitle
          color={"white"}
          textAlign="center"
          sx={{ backgroundColor: props.colorCode }}
        >
          {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            mt={3}
            fontWeight={"bold"}
            color={"black"}
            textAlign="center"
            fontSize="1.4rem"
          >

            <br />
            {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.setPopup} autoFocus variant="contained">
            {props.buttonTitle}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

