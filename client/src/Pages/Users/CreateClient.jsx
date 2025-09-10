import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createClient } from "../../redux/action/user";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreateClient = ({ open, setOpen, scroll }) => {
  //////////////////////////////////////// VARIABLES /////////////////////////////////////
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const initialClientState = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    phone: "",
    email: "",
  }

  //////////////////////////////////////// STATES /////////////////////////////////////
  const [clientData, setClientData] = useState(initialClientState);
  const [errors, setErrors] = useState({});

  //////////////////////////////////////// USE EFFECTS /////////////////////////////////////

  //////////////////////////////////////// FUNCTIONS /////////////////////////////////////
  const validateClientData = () => {
    const newErrors = {};
    if (!clientData.firstName) newErrors.firstName = "First Name is required";
    if (!clientData.lastName) newErrors.lastName = "Last Name is required";
    if (!clientData.username) newErrors.username = "Username is required";
    if (!clientData.email) newErrors.email = "Email is required";
    if (!clientData.password) newErrors.password = "Password is required";
    if (!clientData.phone) newErrors.phone = "Phone number is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateClientData();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    dispatch(createClient(clientData, setOpen));
    setClientData(initialClientState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }

    setClientData((prevFilters) => ({ ...prevFilters, [name]: value, }));
  };

  const handleClose = () => {
    setOpen(false);
    setClientData(initialClientState)
    setErrors({});
  };

  return (
    <div>
      <Dialog
        scroll={scroll}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth="sm"
        maxWidth="sm"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="flex items-center justify-between">
          <div className="text-sky-400 font-primary">Add New Client</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiNotepad size={23} />
              <span>Client Details</span>
            </div>
            <Divider />
            <table className="mt-4">
              <tr>
                <td className="pb-4 text-lg">First Name </td>
                <td className="pb-4">
                  <TextField
                    name="firstName"
                    size="small"
                    fullWidth
                    value={clientData.firstName}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Last Name </td>
                <td className="pb-4">
                  <TextField
                    name="lastName"
                    size="small"
                    fullWidth
                    value={clientData.lastName}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">User Name </td>
                <td className="pb-4">
                  <TextField
                    name="username"
                    size="small"
                    fullWidth
                    value={clientData.username}
                    error={!!errors.username}
                    helperText={errors.username}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Email </td>
                <td className="pb-4">
                  <TextField
                    name="email"
                    size="small"
                    fullWidth
                    value={clientData.email}
                    error={!!errors.email}
                    helperText={errors.email}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td className="flex items-start pt-2 text-lg">Password </td>
                <td className="pb-4">
                  <TextField
                    name="password"
                    type="password"
                    value={clientData.password}
                    error={!!errors.password}
                    helperText={errors.password}
                    onChange={handleChange}
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="flex items-start pt-2 text-lg">Phone </td>
                <td className="pb-4">
                  <TextField
                    name="phone"
                    type="number"
                    size="small"
                    value={clientData.phone}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    onChange={handleChange}
                    fullWidth
                  />
                </td>
              </tr>
            </table>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleClose}
            type="reset"
            className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin">
            {isFetching ? 'Submitting...' : 'Submit'}
          </button>
        </DialogActions>
      </Dialog>
    </div>

  );
};

export default CreateClient;
