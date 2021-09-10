
import {
    makeStyles,
    Card,
    CardHeader,
    CardContent,
} from '@material-ui/core/';
import Loading from '../../components/Loading';
import currencyFormat from '../../services/currencyFormatService';

const useStyles = makeStyles((theme) => ({
    balance: {
        textAlign: 'center',
        fontSize: '2em'
    }
}));

function CashFlowResume(props) {
    const classes = useStyles();
    const loading = props.loading || false;
    return (
        <Card>
            <CardHeader
                title="Balanço"
            />
            <CardContent className={classes.balance}>
                {  loading 
                    ? (<Loading/>) 
                    : currencyFormat.format(props.balance)
                }
            </CardContent>
        </Card>
    );
}

export default CashFlowResume;