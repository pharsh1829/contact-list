import React, { useEffect, useState } from "react";
import CommonLayout from "../layouts/CommonLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import ROUTES from "../constants/routes";
import { deleteItem } from "../reducers/ContactReducer";

const ContactDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { contacts } = useSelector((state) => state);
  const [details, setDetails] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  useEffect(() => {
    setDetails(
      contacts.list.filter((v) => v.id === Number(params.id))?.[0] ?? null
    );
  }, [params.id, contacts.list]);

  const deleteContact = () => {
    dispatch(deleteItem(params.id));
    navigate(ROUTES.HOME);
  };

  if (!details) {
    return <CommonLayout></CommonLayout>;
  }

  return (
    <CommonLayout>
      <Box className="detail-header"></Box>

      <Box display="flex" className="detail-card" flexDirection={"column"}>
        <Box
          display="flex"
          flexWrap={"wrap"}
          justifyContent={"center"}
          flexDirection={"column"}
        >
          <Box
            display={"flex"}
            justifyContent={"center"}
            mb={"1rem"}
            mt={"-6rem"}
            padding={"0.5rem"}
          >
            <img
              alt=""
              src={details.profileImage}
              width={180}
              style={{ borderRadius: "50%" }}
            />
          </Box>
          <Box ml={3}>
            <Box mb={"3.5rem"} display="flex" justifyContent={"space-between"}>
              <Box>
                <Typography fontWeight="bold" fontSize={25}>
                  {details.name}
                </Typography>
                <Typography color="gray" fontWeight={600}>
                  {details.email}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="end" p={1}>
                <IconButton
                  disableElevation
                  variant="contained"
                  size="large"
                  className="button-custom"
                  color="success"
                  startIcon={<Edit />}
                  onClick={() =>
                    navigate(ROUTES.CREATE.replace(":id", params.id))
                  }
                >
                  <Edit />
                </IconButton>
                <IconButton
                  disableElevation
                  variant="contained"
                  size="large"
                  className="button-custom"
                  color="error"
                  onClick={() => setDeleteConfirmation(true)}
                >
                  <Delete />
                </IconButton>
              </Box>
            </Box>
            <Box display="flex" mb={"0.8rem"}>
              <Typography
                color="gray"
                fontWeight={600}
                width={"60%"}
                fontSize={14}
              >
                Gender
              </Typography>
              <Typography fontWeight={600}>{details.gender}</Typography>
            </Box>

            <Box display="flex" mb={"0.8rem"}>
              <Typography
                color="gray"
                fontWeight={600}
                width={"60%"}
                fontSize={14}
              >
                Date of Birth
              </Typography>
              <Typography fontWeight={600}>{details.dob}</Typography>
            </Box>

            <Box display="flex" mb={"0.8rem"}>
              <Typography
                color="gray"
                fontWeight={600}
                width={"60%"}
                fontSize={14}
              >
                Phone Number
              </Typography>
              <Typography fontWeight={600}>{details.phoneNumber}</Typography>
            </Box>

            <Box display="flex" mb={"0.8rem"}>
              <Typography
                color="gray"
                fontWeight={600}
                width={"60%"}
                fontSize={14}
              >
                Nationality
              </Typography>
              <Typography fontWeight={600}>{details.nationality}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Dialog open={deleteConfirmation}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Typography>You want to delete this contact?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            disableElevation
            className="button-custom"
            color="primary"
            onClick={deleteContact}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            disableElevation
            className="button-custom"
            color="error"
            onClick={() => setDeleteConfirmation(false)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </CommonLayout>
  );
};

export default ContactDetails;
