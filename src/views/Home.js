import React, { useEffect, useState } from "react";
import CommonLayout from "../layouts/CommonLayout";
import { useSelector, useDispatch } from "react-redux";
import { clearFilterData } from "../reducers/ContactReducer";
import {
  Box,
  ButtonGroup,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import Filter from "../components/Home/Filter";
import ListTable from "../components/Home/ListTable";
import { Close, GridOn, List, TableRows } from "@mui/icons-material";

const Home = () => {
  const dispatch = useDispatch();
  const { contacts } = useSelector((state) => state);
  const [filters, setFilters] = useState(0);
  const [items, setItems] = useState([]);

  useEffect(() => {
    let count = 0;
    Object.entries(contacts.formData).forEach((v) => {
      if (v[1]) {
        count += 1;
      }
    });
    setFilters(count);
  }, [contacts.formData]);

  const clearFilter = () => {
    dispatch(clearFilterData());
  };

  useEffect(() => {
    const list = contacts.list.slice(
      contacts.page === 1 ? 0 : (contacts.page - 1) * contacts.limitPerPage,
      contacts.page * contacts.limitPerPage
    );
    setItems(list);
  }, [contacts.page, contacts.list]);

  return (
    <CommonLayout>
      <Box className="detail-header"></Box>
      <Box display="flex" mt={"-12.5rem"} justifyContent="center">
        <Box>
          <Filter />
          {filters > 0 && (
            <Typography className="filter-pill" mt={2}>
              {filters} Filter{filters > 1 ? "s" : ""} Applied
              <IconButton size="small" onClick={clearFilter}>
                <Close fontSize="small" />
              </IconButton>
            </Typography>
          )}
        </Box>
        <Box display="flex" flexDirection="column" width={"80%"} mt={"-2.5rem"}>
          <Box>
            <ButtonGroup>
              <IconButton
                style={{ color: contacts.listType === 1 ? "white" : "" }}
              >
                <List />
              </IconButton>
              <IconButton
                style={{ color: contacts.listType === 2 ? "white" : "" }}
              >
                <GridOn />
              </IconButton>
            </ButtonGroup>
          </Box>
          {contacts.listType === 1 && <ListTable items={items} />}
        </Box>
      </Box>
    </CommonLayout>
  );
};

export default Home;
