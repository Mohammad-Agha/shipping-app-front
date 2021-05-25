import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import DeleteSuccessModal from "./DeleteSuccessModal";
import { DELETE_SHIPMENT } from "../api/api";
import { useMutation } from "@apollo/client";

const DeleteModal = ({ props }) => {
  const [deleteShipmentSuccessModal, setDeleteShipmentSuccessModal] =
    useState(false);
  const [status, setStatus] = useState("");
  const handleDeleteShipmentSuccessModalOpen = () => {
    setDeleteShipmentSuccessModal(true);
  };

  const handleDeleteShipmentSuccessModalClose = () => {
    setDeleteShipmentSuccessModal(false);
    handleDeleteShipmentModalClose();
  };

  const {
    deleteShipmentModal,
    handleDeleteShipmentModalClose,
    deletedId,
    deletedShipmentName,
    setDataChange,
    length,
    setPage,
  } = props;

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
  }));
  const classes = useStyles();

  const [deleteShipmentApi, { data, loading, err }] = useMutation(
    DELETE_SHIPMENT,
    {
      context: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
      variables: {
        id: deletedId,
      },
      onCompleted: (shipment) => {
        console.log(shipment);
        handleDeleteShipmentSuccessModalOpen();
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const deleteShipment = async () => {
    deleteShipmentApi();
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={deleteShipmentModal}
        onClose={handleDeleteShipmentModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={deleteShipmentModal}>
          <div className={classes.paper}>
            <span
              style={{ marginRight: "10px" }}
              id="transition-modal-description"
            >
              Are you sure you want to delete Shipment for{" "}
              <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
                {deletedShipmentName}{" "}
              </span>
            </span>
            <Button
              style={{ marginRight: "10px" }}
              onClick={deleteShipment}
              variant="contained"
              color="secondary"
            >
              Yes
            </Button>
            <Button
              onClick={() => {
                handleDeleteShipmentModalClose();
              }}
              variant="contained"
              color="primary"
            >
              No
            </Button>
          </div>
        </Fade>
      </Modal>
      {deleteShipmentSuccessModal && (
        <DeleteSuccessModal
          props={{
            deleteShipmentSuccessModal,
            handleDeleteShipmentSuccessModalClose,
            status,
          }}
        />
      )}
    </>
  );
};

export default DeleteModal;
