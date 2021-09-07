import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
            marginBottom: '15px'
        }
    }
}));

function VerticalForm(props) {
    const classes = useStyles();
    const {children} = props;
    return (
        <form {...props} className={classes.form}>
            {children}
        </form>
    );
}

export default VerticalForm;