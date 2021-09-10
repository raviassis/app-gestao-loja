import ReactLoading from "react-loading";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    loadingField: {
        display: 'flex',
        justifyContent: 'center'
    }
}));

export default function Loading(props) {
    const classes = useStyles();
    return (
        <div className={classes.loadingField}>
            <ReactLoading 
                type="spin" 
                color="#3f51b5" 
                {...props}/> 
        </div>
    );
}