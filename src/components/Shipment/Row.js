import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import UpdateIcon from "@material-ui/icons/Update";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
const TableRows = ({ props }) => {
  const {
    row,
    setDeletedId,
    setDeletedShipmentName,
    setUpdateId,
    handleDeleteShipmentModalOpen,
    handleUpdateShipmentModalOpen,
  } = props;

  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));
  const classes = useStyles();

  return (
    <TableRow key={row.id}>
      <TableCell style={{ fontSize: 12 }} size="small" align="center">
        {row.customer_name}
      </TableCell>
      <TableCell style={{ fontSize: 12 }} size="small" align="center">
        {row.customer_address}
      </TableCell>
      <TableCell style={{ fontSize: 12 }} size="small" align="center">
        {row.customer_phone}
      </TableCell>
      <TableCell style={{ fontSize: 12 }} size="small" align="center">
        {row.created_at}
      </TableCell>
      <TableCell style={{ fontSize: 12 }} size="small" align="center">
        {row.updated_at}
      </TableCell>
      <TableCell
        size="small"
        align="center"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          href={`http://localhost:8000/storage/${row.waybill}`}
          className={classes.button}
          startIcon={<VisibilityIcon />}
          target="_blank"
        >
          View
        </Button>
        <Button
          onClick={() => {
            setUpdateId(row.id);
            handleUpdateShipmentModalOpen();
          }}
          variant="contained"
          color="default"
          className={classes.button}
          startIcon={<UpdateIcon />}
        >
          Update
        </Button>
        <Button
          onClick={() => {
            setDeletedId(row.id);
            setDeletedShipmentName(row.customer_name);
            handleDeleteShipmentModalOpen();
          }}
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          className={classes.button}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TableRows;
