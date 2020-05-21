import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import ModalTransaction from './ModalTrasaction'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        background: '#eeeeee',
        marginBottom: 30,
        borderLeft: props => props.infoTransaction.amount > 0 ? `6px solid #8bc34a` : `6px solid #ff6e40`
    },
    cardcontent: {
        display: 'flex',
        alignItems: 'center',
    },
    boxdate: {
        width: 70,
        background: '#fff',
        borderRadius: 5,
        padding: 2,
        height: 'min-content',
    },
    day: {
        fontSize: 35,
        height: 42,
    },
    description: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
    },
    amount: {
        fontSize: 40,
        color: props => props.infoTransaction.amount > 0 ? `#8bc34a` : `#ff6e40`
    },
    dividerCard: {
        margin: '0 20px',
        borderLeft: props => props.infoTransaction.amount > 0 ? '1px solid #8bc34a' : '1px solid #ff6e40'
    },
    contentButtonDelete: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonDelete: {
        background: "#d32f2f",
        color: "#fff",
        "&:hover": {
            background: '#e53935'
          }
    }
});


const Transaction = (props) => {
    const classes = useStyles(props);
    const [openModal, setOpenModal] = useState(false);
    const month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const date = new Date(props.infoTransaction.date)
    const month = month_names_short[date.getMonth()]
    const day = date.getDate() + 1

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return(
        <React.Fragment>
        <Card className={classes.root}>
            <CardContent className={classes.cardcontent}>
                <div className={classes.boxdate}>
                    <Typography variant="h6" align="center" className={classes.day}>
                        {day}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" align="center">
                        {month}
                    </Typography>
                </div>
                <div className={classes.description}>
                    <Typography variant="h5" component="h2">
                        {props.infoTransaction.description}
                    </Typography>
                    <Typography variant="body2" component="p" className={classes.amount}>
                        {props.infoTransaction.amount > 0 ? 
                            `+$${props.infoTransaction.amount}` : ` -$${Math.abs(props.infoTransaction.amount)}`}
                    </Typography>
                </div>
                <Divider orientation="vertical" flexItem className={classes.dividerCard}/>
                <div className={classes.contentButtonDelete}>
                    <Button 
                        variant="contained" 
                        onClick={handleOpenModal}
                        className={classes.buttonDelete}
                    >
                        <DeleteIcon />
                    </Button>
                </div>
            </CardContent>
        </Card>
        <ModalTransaction open={openModal} handleCloseModal={handleCloseModal} id={props.infoTransaction.id}/>
        </React.Fragment>
    )
}

export default Transaction;