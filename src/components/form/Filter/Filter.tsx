import {
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
} from "@mui/material";
import React, { useCallback } from "react";

type FilterProps = {
  filter: string;
  setFilter: (filter: string) => void;
  year: string;
  setYear: (year: string) => void;
  minPrice: string;
  setMinPrice: (minPrice: string) => void;
  maxPrice: string;
  setMaxPrice: (maxPrice: string) => void;
};

export const Filter = React.memo((props: FilterProps) => {
  const handleFilterChange = useCallback(
    (event: SelectChangeEvent): void => {
      props.setFilter(event.target.value);
    },
    [props]
  );

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
        flexDirection: "column",
        marginBottom: 3,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FormControl sx={{ m: 2, minWidth: 120 }} size="small">
        <InputLabel id="filter-select-label">Фильтр</InputLabel>
        <Select
          labelId="filter-select-label"
          id="filter-select"
          value={props.filter}
          label="Filter"
          onChange={handleFilterChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="year">Год выпуска</MenuItem>
          <MenuItem value="price">Стоимость</MenuItem>
        </Select>
      </FormControl>
      {props.filter === "year" && (
        <TextField
          label="Год выпуска"
          variant="outlined"
          size="small"
          value={props.year}
          onChange={(e) => props.setYear(e.target.value)}
        />
      )}
      {props.filter === "price" && (
        <>
          <TextField
            label="Минимальная цена"
            variant="outlined"
            size="small"
            value={props.minPrice}
            onChange={(e) => props.setMinPrice(e.target.value)}
          />
          <TextField
            label="Максимальная цена"
            variant="outlined"
            size="small"
            value={props.maxPrice}
            onChange={(e) => props.setMaxPrice(e.target.value)}
          />
        </>
      )}
    </Box>
  );
});
