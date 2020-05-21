import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { refreshTransaction, loadTransaction } from '../redux/actions'
import Layout from "../layout/Layout";
import Transaction from "../components/Transaction";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import fetch from 'isomorphic-unfetch'
import CachedIcon from '@material-ui/icons/Cached';
import GenericModal from "../components/GenericModal"

const useStyles = makeStyles({
  titleHistory: {
    margin: "10px 0",
    color: "#756161",
  },
  balance: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "20px 0",
  },
  divider: {
    marginBottom: 30,
  },
  transactionHistory: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonRefresh: {
    background: "#66bb6a",
    color: "#fff",
    "&:hover": {
      background: "#4caf50",
    },
  },
});


const Index = (props) => {
  const classes = useStyles();
  const [propsModal, setPropsModal] = useState({typeModal: '', open: false});
  let amount = ''
  useEffect(() => {
    props.loadTransaction(props.initialTransactions)
  }, []);

  if(props.data.length > 0){
      let total = props.data.map((obj) => obj.amount).reduce((a=0, b)=>a + Number(b))
      amount = total >= 0 ? `+$${total}` : `-$${Math.abs(total)}`
  }



  const handleRefreshTransactions = async () => {
    await fetch("api/transactions", {headers: {'content-type': 'application/json'}})
            .then(response => {
                  if(response.ok){
                    response.json().then(res => {
                      setPropsModal({typeModal: 'RefreshTransactionSuccess', open: true})
                      props.refreshTransaction(res)
                      setTimeout(()=>setPropsModal({typeModal: 'RefreshTransactionSuccess', open: false}), 2000)
                    })
                  }
            })
            .catch((error) => {
              setPropsModal({typeModal: 'RefreshTransactionError', open: true})
              setTimeout(()=>setPropsModal({typeModal: 'RefreshTransactionError', open: false}), 2000)
            })
  };

  props.data.sort((a, b) => {
    return Number(new Date(b.date)) - Number(new Date(a.date));
  });

  return (
    <Layout>
      <Container maxWidth="sm">
        <div className={classes.balance}>
          <Typography variant="h4" className={classes.titleHistory}>
            Current Balance
          </Typography>
          <Typography variant="h4" className={classes.titleHistory}>
            {amount}
          </Typography>
        </div>
        <Divider className={classes.divider} />
        <div className={classes.transactionHistory}>
          <Typography variant="h5" className={classes.titleHistory}>
            Transaction history
          </Typography>
          <Button
            variant="contained"
            className={classes.buttonRefresh}
            onClick={handleRefreshTransactions}
          >
            <CachedIcon />
          </Button>
        </div>
        {props.data.map((tran, index) => (
          <Transaction infoTransaction={tran} key={index} />
        ))}
      </Container>
      <GenericModal propsModal={propsModal} />
    </Layout>
  );
};

Index.getInitialProps = async ({store, isServer, pathname, query}) => {
  let tra = []
  await fetch(`${process.env.URL_BASE}api/transactions`, {headers: {'content-type': 'application/json'}})
                  .then(response => {
                          return response.json().then(res => res)
                }).then(data => tra = data)
  return {initialTransactions: tra};
};

const mapStateToProps = (state) => {
  return {
    data: state.trans
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    refreshTransaction: (data) => {
      dispatch(refreshTransaction(data))
    },
    loadTransaction: (loadData) => {
      dispatch(loadTransaction(loadData))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);

