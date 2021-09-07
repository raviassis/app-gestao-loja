import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider
} from '@material-ui/core';
import {
    Home,
    ExitToApp,
    Person,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import authService from '../../services/authService';
const useStyles = makeStyles((theme) => ({
    menu: {
        width: "250px",
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    button: {
        width: '100%'
    }
}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

export default function Menu(props) {
    const classes = useStyles();
    return (
        <div className={classes.menu}>
            <List>
                <ListItemLink href="/">
                    <ListItemIcon>
                        <Home/>
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemLink>
                <ListItemLink href="/account">
                    <ListItemIcon>
                        <Person/>
                    </ListItemIcon>
                    <ListItemText primary="Minha Conta" />
                </ListItemLink>
            </List>
            <List>
                <Divider />
                <ListItem button onClick={() => authService.logout()}>
                    <ListItemIcon>
                        <ExitToApp/>
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </div>
    );
}