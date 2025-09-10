import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";
import { updateUser } from "../../redux/action/user";
import { useDispatch, useSelector } from "react-redux";
import {PiNotepad, PiXLight,} from "react-icons/pi";
import { Divider, Dialog, DialogContent, DialogTitle, Slide, DialogActions } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const EditClient = ({ open, setOpen }) => {
  /////////////////////////////////////// VARIABLES ///////////////////////////////////////
  const dispatch = useDispatch();
  const { currentClient, isFetching } = useSelector((state) => state.user);
  const initialClientState = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
  };

  /////////////////////////////////////// STATES ///////////////////////////////////////
  const [clientData, setClientData] = useState(currentClient);
  /////////////////////////////////////// USE EFFECT ///////////////////////////////////////
  useEffect(() => {
    setClientData(currentClient);
  }, [currentClient]);

  /////////////////////////////////////// FUNCTIONS ///////////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(currentClient._id, clientData, clientData?.role));
    setClientData(initialClientState);
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientData((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      scroll={"paper"}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      fullWidth="sm"
      maxWidth="sm"
      aria-describedby="alert-dialog-slide-description">
      <DialogTitle className="flex items-center justify-between">
        <div className="text-sky-400 font-primary">Edit Client</div>
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
                  value={clientData?.firstName}
                  onChange={handleInputChange}
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
                  value={clientData?.lastName}
                  onChange={handleInputChange}
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
                    placeholder="Optional"
                    value={clientData?.email}
                    onChange={handleInputChange}
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
                  value={clientData?.username}
                  onChange={handleInputChange}
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
                  value={clientData?.phone}
                  onChange={handleInputChange}
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
          {isFetching ? "Submitting..." : "Submit"}
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default EditClient;
