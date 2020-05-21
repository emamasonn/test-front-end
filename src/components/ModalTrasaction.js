import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import {deleteTransaction} from '../redux/actions'
import fetch from 'isomorphic-unfetch'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import GenericModal from './GenericModal'

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
  buttonAccept: {
    background: "#66bb6a",
    color: "#fff",
    "&:hover": {
      background: "#4caf50",
    },
  }
}));

const ModalTransaction = (props) => {
  const classes = useStyles();
  const [propsModal, setPropsModal] = useState({typeModal: '', open: false});

  const handleDeleteTransaction = async (id) => {
      await fetch (`api/transactions/${id}`, {
        method: 'DELETE'
      })
      .then(res => {
        if (res.status === 204) {
          props.deleteTransaction(id)
          //setPropsModal({typeModal: 'DeleteTransactionSuccess', open: true})
          //setTimeout(()=>setPropsModal({typeModal: 'DeleteTransactionSuccess', open: false}), 2000)
        }
      })
      .catch((error)=>{
        setPropsModal({typeModal: 'DeleteTransactionError', open: true})
        setTimeout(()=>setPropsModal({typeModal: 'DeleteTransactionError', open: false}), 2000)
      })
      props.handleCloseModal()
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Delete Transaction</h2>
            <p id="transition-modal-description">Are you sure want to delete the transaction?</p>
            <Button variant="contained" onClick={() => handleDeleteTransaction(props.id)} className={classes.buttonAccept}>
              Accept
            </Button>
          </div>
        </Fade>
      </Modal>
      <GenericModal propsModal={propsModal}/>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTransaction: (id) => {
      dispatch(deleteTransaction(id))
    }
  }
}

export default connect(null, mapDispatchToProps)(ModalTransaction);