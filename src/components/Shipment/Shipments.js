import React, { useState } from "react";
import Drawer from "../../Drawer";
import clsx from "clsx";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Pagination from "@material-ui/lab/Pagination";
import Row from "./Row";
import AddModal from "./modals/AddModal";
import DeleteModal from "./modals/DeleteModal";
import UpdateModal from "./modals/UpdateModal";
import { makeStyles } from "@material-ui/core/styles";
import { GET_SHIPMENTS } from "./api/api";
import { useQuery } from "@apollo/client";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  button: {
    margin: theme.spacing(1),
  },
  table: {
    minWidth: 650,
  },
}));

const Shipments = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const [page, setPage] = useState(1);

  const [rows, setRows] = useState([]);

  const [total, setTotal] = useState(0);

  const [addShipmentModal, setAddShipmentModal] = useState(false);

  const [updateShipmentModal, setUpdateShipmentModal] = useState(false);

  const [deleteShipmentModal, setDeleteShipmentModal] = useState(false);

  const [deletedId, setDeletedId] = React.useState(null);
  const [deletedShipmentName, setDeletedShipmentName] = React.useState(null);

  const [updateId, setUpdateId] = useState(null);

  const userId = localStorage.getItem("user");

  const { loading, data } = useQuery(GET_SHIPMENTS, {
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
    variables: { userId: parseInt(userId), page },
    onCompleted: (k) => {
      setTotal(Math.ceil(data.shipments.paginatorInfo.total / 10));
      setRows(data.shipments.data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleAddShipmentModalOpen = () => {
    setAddShipmentModal(true);
  };

  const handleAddShipmentModalClose = () => {
    setAddShipmentModal(false);
  };

  const handleUpdateShipmentModalOpen = () => {
    setUpdateShipmentModal(true);
  };

  const handleUpdateShipmentModalClose = () => {
    setUpdateShipmentModal(false);
  };

  const handleDeleteShipmentModalOpen = () => {
    setDeleteShipmentModal(true);
  };

  const handleDeleteShipmentModalClose = () => {
    setDeleteShipmentModal(false);
  };

  return (
    <div className={classes.container}>
      <Drawer view="Shipments" open={[open, setOpen]} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Button
          style={{ marginBottom: "20px" }}
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<AddCircleIcon />}
          onClick={handleAddShipmentModalOpen}
        >
          Add Shipment
        </Button>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                {["Name", "Address", "Phone", "Created", "Updated"].map(
                  (cell, key) => (
                    <TableCell
                      style={{ fontSize: 12 }}
                      key={key}
                      size="small"
                      align="center"
                    >
                      {cell}
                    </TableCell>
                  )
                )}
                <TableCell size="small" align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, key) => (
                <Row
                  key={key}
                  props={{
                    row,
                    setDeletedId,
                    setDeletedShipmentName,
                    setUpdateId,
                    handleDeleteShipmentModalOpen,
                    handleUpdateShipmentModalOpen,
                  }}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div
          style={{ marginTop: 45, display: "flex", justifyContent: "center" }}
        >
          {loading && <p>Loading...</p>}
          {rows.length > 0 && (
            <Pagination
              color="primary"
              count={total}
              page={page}
              onChange={handlePageChange}
            />
          )}
        </div>
        {addShipmentModal && (
          <AddModal
            props={{
              addShipmentModal,
              handleAddShipmentModalClose,
              rows,
            }}
          />
        )}

        {updateShipmentModal && (
          <UpdateModal
            props={{
              updateShipmentModal,
              handleUpdateShipmentModalClose,
              updateId,
            }}
          />
        )}
        {deleteShipmentModal && (
          <DeleteModal
            props={{
              deleteShipmentModal,
              handleDeleteShipmentModalClose,
              deletedId,
              deletedShipmentName,
              length: rows.length,
              setPage,
            }}
          />
        )}
      </main>
    </div>
  );
};

export default Shipments;
