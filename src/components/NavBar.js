import Link from 'next/link';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: '#fff',
  },
  menuButton: {
    
  },
  appBar: {
    background: '#fff',
  },
  title: {
    //flexGrow: 1,
  },
  linkNav: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 10px',
    textDecoration: 'none',
    color: '#000',
  }
}));

const NavBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
            <Link href="/" >
                <a className={classes.linkNav}>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <HomeIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Expenses Account
                    </Typography>
                </a>
            </Link>
            
            <Link href="/newTransaction" >
                <a className={classes.linkNav}>
                  <Typography variant="h6" className={classes.title}>
                    New Transaction
                  </Typography>
                </a>
            </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;