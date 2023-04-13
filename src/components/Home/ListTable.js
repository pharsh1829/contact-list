import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../reducers/ContactReducer";

const ListTable = ({ items }) => {
  const { contacts } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Box display="flex" flexDirection="column" width={"100%"}>
      <TableContainer className="table-container">
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Profile</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone number</TableCell>
              <TableCell>Nationality</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>DOB</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.length > 0 &&
              items.map((con) => (
                <TableRow>
                  <TableCell
                    onClick={() => navigate(ROUTES.VIEW.replace(":id", con.id))}
                    width={50}
                    style={{ cursor: "pointer" }}
                  >
                    <Avatar alt={con.name} src={con.profileImage} />
                  </TableCell>
                  <TableCell
                    onClick={() => navigate(ROUTES.VIEW.replace(":id", con.id))}
                    style={{
                      color: "#000",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    {con.name}
                  </TableCell>
                  <TableCell>{con.email}</TableCell>
                  <TableCell>{con.phoneNumber}</TableCell>
                  <TableCell>{con.nationality}</TableCell>
                  <TableCell>{con.gender}</TableCell>
                  <TableCell>{con.dob}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="flex-end">
        <Pagination
          count={parseFloat(
            contacts.list.length / contacts.limitPerPage
          ).toFixed(0)}
          color="primary"
          onChange={(_, value) => {
            dispatch(setPage(value));
          }}
          defaultPage={contacts.page}
        />
      </Box>
    </Box>
  );
};

export default ListTable;
