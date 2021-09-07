import { useState } from 'react';
import { 
    Drawer,
    AppBar,
    Toolbar,
    IconButton,
} from '@material-ui/core';
import {
    Switch,
    Route
  } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import Menu from './Menu';
import CashFlow from '../CashFlow';
import Account from '../Account';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    button: {
        color: 'white'
    },
}));

export default function Home(props) {
    const classes = useStyles();
    const [state, setState] = useState({
        open: false
    });
    return (
        <>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <IconButton onClick={() => setState({...state, open: true})} className={classes.button} edge="end">
                        <MenuIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer 
                anchor="right"
                open={state.open}
                onClose={() => setState({...state, open:false})}
                >
                    <Menu/>
            </Drawer>
            <Switch>
                <Route path="/" exact component={CashFlow}/>
                <Route path="/account" exact component={Account}/>
            </Switch>
            
        </>
    );
}