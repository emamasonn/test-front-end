import React, { useRef, useState } from 'react'
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';
import {createTransaction} from "../redux/actions"
import { connect } from "react-redux";
import { green } from '@material-ui/core/colors';
import Layout from '../layout/Layout';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import GenericModal from '../components/GenericModal'
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles({
    titleCreate:{
        margin: "30px 0",
        color: "#756161",
    },
    formCreate:{
        display: 'flex',
        flexDirection: 'column',
        marginTop: 30,
    },
    description: {
        margin: 20,
    },
    amount: {
        margin: 20,
    },
    date: {
        margin: 20,
    },
    buttonCreate: {
        margin: '20px auto',
        background: '#66bb6a',
        color: '#fff',
        "&:hover": {
            background: "#4caf50",
          },
    },
})

const theme = createMuiTheme({
    palette: {
      primary: green,
    },
});

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix="$"
      />
    );
}

const CreateTransaction = (props) => {
    const classes = useStyles();
    const [propsModal, setPropsModal] = useState({typeModal: '', open: false});
    const descriptionRef = useRef()
    const amountRef = useRef()
    const dateRef = useRef()

    const handleNewTransaction = (event) => {
        let formatAmount = Number(amountRef.current.value.replace(",", ".").replace("$", ""))
        
        if(formatAmount === 0){
            setPropsModal({typeModal: 'CreateTransactionError', open: true})
            setTimeout(()=>setPropsModal({typeModal: 'CreateTransactionError', open: false}), 3000)
            event.preventDefault()
            return null
        }

        let transaction = {
            date: dateRef.current.value, //new Date(dateRef.current.value).toISOString(),
            description: descriptionRef.current.value,
            amount: formatAmount,
            id: uuidv4()
        }
        
        fetch('/api/transactions', {
            method: 'POST',
            body: JSON.stringify(transaction),
            headers:{
                'content-type': 'application/json'
            }
        })
        .then(res => {
            if(res.status === 200){
                setPropsModal({typeModal: 'CreateTransactionSuccess', open: true})
                setTimeout(()=>setPropsModal({typeModal: 'CreateTransactionSuccess', open: false}), 3000)
                //event.preventDefault()
            }
        })
        .catch((error) => {
            setPropsModal({typeModal: 'CreateTransactionError', open: true})
            setTimeout(()=>setPropsModal({typeModal: 'CreateTransactionError', open: false}), 2000)
        })
        dateRef.current.value = ""
        descriptionRef.current.value = ""
        document.getElementById("amount-create").value = ""
        event.preventDefault()
    }
    

    return(
        <Layout>
            <Container maxWidth="sm">
                <Typography variant="h4" align="center" className={classes.titleCreate}>
                    Create new Transaction
                </Typography>
                <form onSubmit={handleNewTransaction} className={classes.root} autoComplete="off" className={classes.formCreate}>
                    <ThemeProvider theme={theme}>
                    <TextField 
                        id="description-create" 
                        label="Description"
                        required 
                        className={classes.description}
                        inputRef={descriptionRef}
                    />
                    <TextField
                        label="Amount"
                        name="numberAmount"
                        id="amount-create"
                        required
                        className={classes.amount}
                        inputRef={amountRef}
                        InputProps={{
                            inputComponent: NumberFormatCustom,
                        }}
                    />
                    <TextField
                        name="dateCreate"
                        type="datetime-local"
                        id="date-create"
                        required
                        className={classes.date}
                        inputRef={dateRef}
                    />    
                    </ThemeProvider>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        className={classes.buttonCreate}
                        startIcon={<CreateIcon />}
                    >
                        Create
                    </Button>
                </form>
            </Container>
            <GenericModal propsModal={propsModal} />
        </Layout>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
      createTransaction: (data) => {
        dispatch(createTransaction(data))
      }
    }
}
  
export default connect(null, mapDispatchToProps)(CreateTransaction);
