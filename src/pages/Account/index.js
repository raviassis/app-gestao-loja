import { 
    Container
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import BasicInfoCard from './BasicInfoCard';
import ChangePasswordCard from './ChangePasswordCard';

const useStyles = makeStyles((theme) => ({
    container: {
        '& > *': {
            marginBottom: '15px'
        }
    }
}));

export default function Account(props) {
    const classes = useStyles();
    
    return (
        <Container className={classes.container} maxWidth="sm">
            <h1>Minha conta</h1>
            <BasicInfoCard/>
            <ChangePasswordCard/>
        </Container>
    );
}