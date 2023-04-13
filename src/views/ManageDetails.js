import React, { useEffect, useState } from "react";
import CommonLayout from "../layouts/CommonLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { Save } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import ROUTES from "../constants/routes";
import { updateList } from "../reducers/ContactReducer";

const ManageDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { contacts } = useSelector((state) => state);
  const [details, setDetails] = useState(null);
  const { control, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (params.id === "new") {
      setDetails({
        name: "",
        profileImage:
          "https://fastly.picsum.photos/id/629/200/200.jpg?hmac=rfXtHzV4F0aRmck6r9KotwR3FTAMaIae1Cfe8n2FGeA",
        email: "",
        phoneNumber: "",
        nationality: "",
        gender: "",
        dob: "",
      });

      setValue("name", "");
      setValue("email", "");
      setValue("gender", "");
      setValue("dob", "");
      setValue("phoneNumber", "");
      setValue("nationality", "");
    } else {
      const detail =
        contacts.list.filter((v) => v.id === Number(params.id))?.[0] ?? null;
      setDetails(detail);

      if (detail) {
        setValue("name", detail.name);
        setValue("email", detail.email);
        setValue("gender", detail.gender);
        setValue("dob", detail.dob);
        setValue("phoneNumber", detail.phoneNumber);
        setValue("nationality", detail.nationality);
      }
    }
  }, [params.id, contacts.list]);

  if (!details) {
    return <CommonLayout></CommonLayout>;
  }

  const submitForm = (data) => {
    const payload = {
      ...data,
      id: Number(params.id),
      profileImage:
        details?.profileImage ??
        "https://fastly.picsum.photos/id/629/200/200.jpg?hmac=rfXtHzV4F0aRmck6r9KotwR3FTAMaIae1Cfe8n2FGeA",
      modified: Date.now(),
    };

    if (params.id !== "new") {
      const find = contacts.list.filter((s) => s.id === Number(params.id));
      if (find.length > 0) {
        const tmpArr = [...contacts.list];
        tmpArr[tmpArr.indexOf(find[0])] = payload;
        dispatch(updateList(tmpArr));
      }
    } else {
      const tmpArr = [...contacts.list];
      tmpArr.push({ ...payload, id: contacts.list.length + 1 });
      dispatch(updateList(tmpArr));
    }
    navigate(ROUTES.HOME);
  };

  return (
    <CommonLayout>
      <Box
        className="detail-header"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography color="white" fontSize={30} fontWeight="bold">
          {params.id === "new" ? `Add Contact` : `Update Contact`}
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(submitForm)}>
        <Box display="flex" className="detail-card" flexDirection={"column"}>
          <Box
            display="flex"
            flexWrap={"wrap"}
            justifyContent={"center"}
            flexDirection={"column"}
          >
            <Box ml={3}>
              <Box display="flex" mb={"0.8rem"}>
                <Typography
                  color="gray"
                  fontWeight={600}
                  width={"30%"}
                  fontSize={14}
                >
                  Name
                </Typography>
                <Controller
                  name="name"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Please enter value",
                    },
                  }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      onChange={onChange}
                      variant="outlined"
                      size="small"
                      className="input"
                      value={value}
                      error={Boolean(error?.message)}
                      helperText={error?.message ?? ""}
                      fullWidth
                    />
                  )}
                />
              </Box>
              <Box display="flex" mb={"0.8rem"}>
                <Typography
                  color="gray"
                  fontWeight={600}
                  width={"30%"}
                  fontSize={14}
                >
                  Email
                </Typography>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Please enter a valid email",
                    },
                  }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      onChange={onChange}
                      variant="outlined"
                      size="small"
                      className="input"
                      value={value}
                      error={Boolean(error?.message)}
                      helperText={error?.message ?? ""}
                      fullWidth
                    />
                  )}
                />
              </Box>
              <Box display="flex" mb={"0.8rem"}>
                <Typography
                  color="gray"
                  fontWeight={600}
                  width={"30%"}
                  fontSize={14}
                >
                  Gender
                </Typography>
                <Controller
                  name="gender"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Please select value",
                    },
                  }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      variant="outlined"
                      size="small"
                      className="input"
                      select
                      value={value}
                      error={Boolean(error?.message)}
                      helperText={error?.message ?? ""}
                      onChange={onChange}
                      style={{ minWidth: 200 }}
                      fullWidth
                    >
                      <MenuItem value={"Male"}>Male</MenuItem>
                      <MenuItem value={"Female"}>Female</MenuItem>
                    </TextField>
                  )}
                />
              </Box>

              <Box display="flex" mb={"0.8rem"}>
                <Typography
                  color="gray"
                  fontWeight={600}
                  width={"30%"}
                  fontSize={14}
                >
                  Date of Birth
                </Typography>
                <Controller
                  name="dob"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Please enter value",
                    },
                  }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      onChange={onChange}
                      variant="outlined"
                      size="small"
                      className="input"
                      type="date"
                      value={value}
                      error={Boolean(error?.message)}
                      helperText={error?.message ?? ""}
                      fullWidth
                    />
                  )}
                />
              </Box>

              <Box display="flex" mb={"0.8rem"}>
                <Typography
                  color="gray"
                  fontWeight={600}
                  width={"30%"}
                  fontSize={14}
                >
                  Phone Number
                </Typography>
                <Controller
                  name="phoneNumber"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Please enter value",
                    },
                  }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      onChange={onChange}
                      variant="outlined"
                      size="small"
                      className="input"
                      value={value}
                      error={Boolean(error?.message)}
                      helperText={error?.message ?? ""}
                      fullWidth
                    />
                  )}
                />
              </Box>

              <Box display="flex" mb={"0.8rem"}>
                <Typography
                  color="gray"
                  fontWeight={600}
                  width={"30%"}
                  fontSize={14}
                >
                  Nationality
                </Typography>
                <Controller
                  name="nationality"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Please enter value",
                    },
                  }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      onChange={onChange}
                      variant="outlined"
                      size="small"
                      className="input"
                      value={value}
                      error={Boolean(error?.message)}
                      helperText={error?.message ?? ""}
                      fullWidth
                    />
                  )}
                />
              </Box>
            </Box>
            <Box display="flex" justifyContent="center" mt={2}>
              <Button
                variant="contained"
                className="button-custom"
                disableElevation
                size="large"
                startIcon={<Save />}
                type="submit"
              >
                Save
              </Button>
              <Button
                variant="outlined"
                className="button-custom"
                disableElevation
                size="large"
                color="error"
                style={{ marginLeft: "0.5rem" }}
                onClick={() => navigate(ROUTES.HOME)}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </CommonLayout>
  );
};

export default ManageDetails;
