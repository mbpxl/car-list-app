import { useCallback, useEffect, useState } from "react";
import { CarType, carsAPI } from "../../../plugins/axios/axios";
import { Box, Grid, Typography } from "@mui/material";
import { CarCard } from "../CarCard/CarCard";
import { Filter } from "../../form/Filter/Filter";
import React from "react";

export const Cars = React.memo(() => {
  const [carsData, setCarsData] = useState<CarType[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  useEffect((): void => {
    const fetchCars = async () => {
      try {
        const data = await carsAPI.getCars();
        setCarsData(data);
      } catch (error) {
        console.error("Ошибка при загрузке данных: ", error);
      }
    };

    fetchCars();
  }, []);

  const filteredCars = carsData.filter((car) => {
    if (filter === "year" && year) {
      return car.year === parseInt(year);
    }
    if (filter === "price") {
      const min = parseInt(minPrice) || 0;
      const max = parseInt(maxPrice) || Infinity;
      return car.price >= min && car.price <= max;
    }
    return true;
  });

  const removeCard = useCallback(
    (id: number): void => {
      setCarsData(carsData.filter((car) => car.id !== id));
    },
    [carsData]
  );

  const updateCar = useCallback(
    (id: number, newName: string, newModel: string, newPrice: number): void => {
      setCarsData(
        carsData.map((car) =>
          car.id === id
            ? { ...car, name: newName, model: newModel, price: newPrice }
            : car
        )
      );
    },
    [carsData]
  );

  return (
    <Box sx={{ maxWidth: 1000, margin: "auto" }}>
      <Typography variant="h4" align="center">
        Список машин
      </Typography>
      <Filter
        filter={filter}
        setFilter={setFilter}
        year={year}
        setYear={setYear}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />
      <Grid container spacing={2} justifyContent="center" mt={3} mb={8}>
        {filteredCars.map((car) => (
          <Grid item xs={5}>
            <CarCard
              id={car.id}
              name={car.name}
              model={car.model}
              year={car.year}
              color={car.color}
              price={car.price}
              removeCard={removeCard}
              updateCar={updateCar}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
});
