import { TextField } from "@mui/material";
import React, { useCallback } from "react";

type EditElementType = {
  isEditMode: boolean;
  setEditMode: (value: boolean) => void;
  value: string | number;
  setValue: (value: any) => void;
};

export const EditElement = React.memo((props: EditElementType) => {
  const handleChangeEditMode = useCallback((): void => {
    props.setEditMode(!props.isEditMode);
  }, [props]);

  const handleChangeValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (!isNaN(Number(props.value))) {
        if (/^\d*$/.test(e.target.value)) {
          props.setValue(e.target.value);
        }
      } else {
        props.setValue(e.target.value);
      }
    },
    [props]
  );

  return (
    <TextField
      id="standard-basic"
      label="Standard"
      variant="standard"
      value={props.value}
      onBlur={handleChangeEditMode}
      onChange={handleChangeValue}
      autoFocus
    />
  );
});
