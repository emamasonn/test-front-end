import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import {deleteTransaction} from '../redux/actions'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    textAlign: "center",
    backgroundColor: theme.palette.background.paper,
    borderRadius: 5,
    padding: theme.spacing(2, 4, 3),
    outline: "none",
  },
  iconSuccess: {
    fontSize: 70,
    color: '#66bb6a',
  },
  iconError: {
    fontSize: 70,
    color: '#d32f2f',
  }
}));


const RefreshTransactionSuccess = ({open, classes}) => (
  <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Transactions Update</h2>
            <p id="transition-modal-description">Transactions were successfully updated</p>
            <PlaylistAddCheckIcon className={classes.iconSuccess}/>          
          </div>
        </Fade>
  </Modal>
)

const RefreshTransactionError = ({open, classes}) => (
  <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Update Error</h2>
            <p id="transition-modal-description">Transactions weren't updated</p>
            <ErrorOutlineIcon className={classes.iconError}/>          
          </div>
        </Fade>
  </Modal>
)

const DeleteTransactionSuccess = ({open, classes}) => (
  <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Transaction Delete</h2>
            <p id="transition-modal-description">Transaction successfully removed</p>
            <DeleteIcon className={classes.iconSuccess}/>          
          </div>
        </Fade>
  </Modal>
)


const DeleteTransactionError = ({open, classes}) => (
  <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Delete Error</h2>
            <p id="transition-modal-description">Transaction weren't delete</p>
            <DeleteForeverIcon className={classes.iconError}/>          
          </div>
        </Fade>
  </Modal>
)

const CreateTransactionSuccess = ({open, classes}) => (
  <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Transactions created</h2>
            <p id="transition-modal-description">The transaction was created successfully</p>
            <PlaylistAddCheckIcon className={classes.iconSuccess}/>          
          </div>
        </Fade>
  </Modal>
)

const CreateTransactionError = ({open, classes}) => (
  <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Error!</h2>
            <p id="transition-modal-description">An error occurred while creating the transaction</p>
            <ErrorOutlineIcon className={classes.iconError}/>          
          </div>
        </Fade>
  </Modal>
)

const GenericModal = (props) => {
  const classes = useStyles();
  let propsModal = props.propsModal

  const showTypeModal = (type) => {
    switch(type){
      case "RefreshTransactionSuccess":
        return <RefreshTransactionSuccess open={propsModal.open} classes={classes}/>
      case "RefreshTransactionError":
        return <RefreshTransactionError open={propsModal.open} classes={classes}/>
      case "DeleteTransactionSuccess":
        return <DeleteTransactionSuccess open={propsModal.open} classes={classes}/>
      case "DeleteTransactionError":
        return <DeleteTransactionError open={propsModal.open} classes={classes}/>
      case "CreateTransactionSuccess":
        return <CreateTransactionSuccess open={propsModal.open} classes={classes}/>
      case "CreateTransactionError":
        return <CreateTransactionError open={propsModal.open} classes={classes}/>
      default:
        return null
    }
  }
  return (
    <div>
      {showTypeModal(propsModal.typeModal)}
    </div>
  );
}

export default GenericModal;