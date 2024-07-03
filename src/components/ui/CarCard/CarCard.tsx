import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import { CarType } from "../../../plugins/axios/axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCallback, useEffect, useState } from "react";
import { EditElement } from "../../form/EditElement/EditElement";
import React from "react";

type CarCardPropsType = {
  removeCard: (id: number) => void;
  updateCar: (
    id: number,
    newName: string,
    newModel: string,
    price: number
  ) => void;
};
type CarCardType = CarType & CarCardPropsType;

export const CarCard = React.memo((props: CarCardType) => {
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [isNameEditMode, setNameEditMode] = useState<boolean>(false);
  const [isEditPriceMode, setEditPriceMode] = useState<boolean>(false);
  const [name, setName] = useState<string>(props.name);
  const [model, setModel] = useState<string>(props.model);
  const [price, setPrice] = useState<number>(props.price);

  const handleRemoveCard = useCallback((): void => {
    props.removeCard(props.id);
  }, [props]);

  const handleChangeEditMode = useCallback((): void => {
    if (isEditMode) {
      props.updateCar(props.id, name, model, price);
    }
    setEditMode(!isEditMode);
  }, [isEditMode, model, name, price, props]);

  const handleChangeNameEditMode = useCallback((): void => {
    if (isNameEditMode) {
      props.updateCar(props.id, name, model, price);
    }
    setNameEditMode(!isNameEditMode);
  }, [isNameEditMode, model, name, price, props]);

  const handleChangePriceEditMode = useCallback((): void => {
    if (isEditPriceMode) {
      props.updateCar(props.id, name, model, price);
    }
    setEditPriceMode(!isEditPriceMode);
  }, [isEditPriceMode, model, name, price, props]);

  useEffect((): void => {
    setModel(props.model);
    setName(props.name);
    setPrice(+props.price);
  }, [props.model, props.name, props.price]);

  return (
    <Card sx={{ maxWidth: 800 }} key={props.id}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {isNameEditMode ? (
            <EditElement
              isEditMode={isNameEditMode}
              setEditMode={setNameEditMode}
              value={name}
              setValue={setName}
            />
          ) : (
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
              onDoubleClick={handleChangeNameEditMode}
            >
              {name}
            </Typography>
          )}

          <IconButton aria-label="delete" onClick={handleRemoveCard}>
            <DeleteIcon />
          </IconButton>
        </Box>
        {isEditMode ? (
          <EditElement
            isEditMode={isEditMode}
            setEditMode={setEditMode}
            value={model}
            setValue={setModel}
          />
        ) : (
          <Typography
            variant="h5"
            component="div"
            onDoubleClick={handleChangeEditMode}
          >
            {model}
          </Typography>
        )}
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.year}
        </Typography>
        <Typography variant="body2">Color: {props.color}</Typography>
        {isEditPriceMode ? (
          <EditElement
            isEditMode={isEditPriceMode}
            setEditMode={setEditPriceMode}
            value={price}
            setValue={setPrice}
          />
        ) : (
          <Typography variant="body2" onDoubleClick={handleChangePriceEditMode}>
            Price: {price}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
});
