import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { makeStyles } from "@material-ui/core/styles";
import AddSuccessModal from "./AddSuccessModal";
import { useMutation } from "@apollo/client";
import { ADD_SHIPMENT } from "../api/api";

const AddModal = ({ props }) => {
  const { addShipmentModal, handleAddShipmentModalClose, setDataChange } =
    props;

  const [addShipmentSuccessModal, setAddShipmentSuccessModal] = useState(false);

  const handleAddShipmentSuccessModalClose = () => {
    setAddShipmentSuccessModal(false);
  };

  const handleAddShipmentSuccessModalOpen = () => {
    setAddShipmentSuccessModal(true);
  };

  const error = { msg: "", status: false };

  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(error);

  const [customerName, setCustomerName] = useState("");
  const [customerNameError, setCustomerNameError] = useState(error);

  const [customerAddress, setCustomerAddress] = useState("");
  const [customerAddressError, setCustomerAddressError] = useState(error);

  const [customerPhone, setCustomerPhone] = useState("");
  const [customerPhoneError, setCustomerPhoneError] = useState(error);

  const userId = localStorage.getItem("user");
  const [addShipmentApi] = useMutation(ADD_SHIPMENT, {
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
    variables: {
      waybill: file,
      customerName,
      customerAddress,
      customerPhone,
      userId: parseInt(userId),
    },
    onCompleted: (shipment) => {
      handleAddShipmentSuccessModalOpen();
      console.log(shipment);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const useStyles = makeStyles((theme) => ({
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    select: {
      // margin: theme.spacing(1),
      marginBottom: 20,
      minWidth: 120,
    },
  }));
  const classes = useStyles();

  const handleFormChange = (e) => {
    e.target.id === "customerName" && setCustomerName(e.target.value);
    e.target.id === "customerPhone" && setCustomerPhone(e.target.value);
    e.target.id === "customerAddress" && setCustomerAddress(e.target.value);
  };

  const addShipment = async (e) => {
    e.preventDefault();
    addShipmentApi();
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={addShipmentModal}
        onClose={handleAddShipmentModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={addShipmentModal}>
          <div className={classes.paper}>
            <Typography
              style={{ color: "#3f51b5" }}
              variant="h4"
              component="h2"
              gutterBottom
            >
              Add Shipment Form
            </Typography>
            <form onSubmit={addShipment} encType="multipart/form-data">
              <FormControl
                style={{
                  display: "block",
                  width: "400px",
                  marginBottom: "20px",
                }}
                error={customerNameError.status}
              >
                <InputLabel htmlFor="customerName">Customer Name</InputLabel>
                <Input
                  placeholder="e.g. John Deo"
                  type="text"
                  required
                  style={{ width: "100%" }}
                  id="customerName"
                  value={customerName}
                  onChange={handleFormChange}
                  aria-describedby="customerName-text"
                />
                {customerNameError.status && (
                  <FormHelperText id="customerName-error-text">
                    {customerNameError.msg}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl
                style={{
                  display: "block",
                  width: "400px",
                  marginBottom: "20px",
                }}
                error={customerAddressError.status}
              >
                <InputLabel htmlFor="customerAddress">
                  Customer Address
                </InputLabel>
                <Input
                  placeholder="e.g. Beirut, Lebanon"
                  type="text"
                  required
                  style={{ width: "100%" }}
                  id="customerAddress"
                  value={customerAddress}
                  onChange={handleFormChange}
                  aria-describedby="customerAddress-text"
                />
                {customerAddressError.status && (
                  <FormHelperText id="customerAddress-error-text">
                    {customerAddressError.msg}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl
                style={{
                  display: "block",
                  width: "400px",
                  marginBottom: "20px",
                }}
                error={customerPhoneError.status}
              >
                <InputLabel htmlFor="customerPhone">Customer Phone</InputLabel>
                <Input
                  placeholder="e.g. +xx xxx xxx"
                  type="text"
                  required
                  style={{ width: "100%" }}
                  id="customerPhone"
                  value={customerPhone}
                  onChange={handleFormChange}
                  aria-describedby="customerPhone-text"
                />
                {customerPhoneError.status && (
                  <FormHelperText id="customerPhone-error-text">
                    {customerPhoneError.msg}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl
                style={{ display: "block", width: "400px", margin: "10px 0" }}
                error={fileError.status}
              >
                <Input
                  type="file"
                  id="fileId"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    setFile(e.currentTarget.files[0]);
                  }}
                />
                {file && <span style={{ marginRight: 10 }}>{file.name}</span>}
                <Button
                  variant="contained"
                  color="default"
                  size="small"
                  className={classes.button}
                  startIcon={<CloudUploadIcon />}
                  onClick={() => document.getElementById("fileId").click()}
                >
                  Upload Waybill
                </Button>
                {fileError.status && (
                  <FormHelperText id="file-error-text">
                    {fileError.msg}
                  </FormHelperText>
                )}
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ display: "block" }}
              >
                Add Shipment
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
      {addShipmentSuccessModal && (
        <AddSuccessModal
          props={{
            addShipmentSuccessModal,
            handleAddShipmentSuccessModalClose,
            handleAddShipmentModalClose,
          }}
        />
      )}
    </>
  );
};

export default AddModal;
