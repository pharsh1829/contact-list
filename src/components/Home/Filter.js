import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import {
  setPage,
  setSearchForm,
  setSearchedValue,
} from "../../reducers/ContactReducer";
import { useDispatch, useSelector } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch();
  const { contacts } = useSelector((state) => state);
  const [form, setForm] = useState({
    name: "",
    gender: "",
    nationality: "",
  });

  const handleSearch = () => {
    dispatch(setSearchForm(form));
    dispatch(setSearchedValue());
  };

  return (
    <Box
      style={{ background: "#ffffffde", backdropFilter: "blur(10px)" }}
      p={3}
      mr={2}
      borderRadius={"1rem"}
      height={"fit-content"}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        flexDirection={"column"}
      >
        <Box display={"flex"} width={"100%"} justifyContent={"space-between"}>
          <Typography fontWeight="bold" variant="h5">
            Add Filters
          </Typography>
        </Box>
        <Box display={"flex"} flexDirection={"column"}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            mt={2}
            flexDirection={"column"}
          >
            <TextField
              onChange={({ target }) => {
                setForm({
                  ...form,
                  name: target.value,
                });
              }}
              label="Name"
              variant="outlined"
              size="small"
              className="input"
              value={form.name}
              style={{ width: 200, marginTop: "0.2rem" }}
            />
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            flexDirection={"column"}
          >
            <TextField
              variant="outlined"
              size="small"
              className="input"
              select
              label="Gender"
              value={form.gender}
              onChange={({ target }) => {
                setForm({
                  ...form,
                  gender: target.value,
                });
              }}
              style={{ width: 200, marginTop: "1rem" }}
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
            </TextField>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            flexDirection={"column"}
          >
            <TextField
              label="Nationality"
              value={form.nationality}
              onChange={({ target }) => {
                setForm({
                  ...form,
                  nationality: target.value,
                });
              }}
              variant="outlined"
              size="small"
              className="input"
              style={{ width: 200, marginTop: "1rem" }}
            />
          </Box>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              className="button-custom"
              disableElevation
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Filter;
