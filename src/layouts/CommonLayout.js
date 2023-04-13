import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../theme/custom.css";
import ROUTES from "../constants/routes";
import { listAllContacts } from "../reducers/ContactReducer";
import { useDispatch, useSelector } from "react-redux";

const CommonLayout = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { contacts } = useSelector((state) => state);

  useEffect(() => {
    if (contacts.list.length === 0) {
      dispatch(listAllContacts());
    }
  }, [dispatch]);

  const Link = ({ label, onClick }) => {
    return (
      <Typography fontWeight="600" className="link-btn" onClick={onClick}>
        {label}
      </Typography>
    );
  };

  return (
    <div>
      <AppBar position="static" elevation={0} className="app-bar">
        <Toolbar>
          <Typography
            fontWeight="bold"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Contacts App
          </Typography>
          <Link label="Contacts" onClick={() => navigate(ROUTES.HOME)} />
          <Link
            label="Add New Contact"
            onClick={() => navigate(ROUTES.CREATE.replace(":id", "new"))}
          />
        </Toolbar>
      </AppBar>
      <Box>{children}</Box>
    </div>
  );
};

export default CommonLayout;
