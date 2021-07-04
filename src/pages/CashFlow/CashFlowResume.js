
import {
    makeStyles,
    Card,
    CardHeader,
    CardContent,
} from '@material-ui/core/';
import currencyFormat from '../../services/currencyFormatService';

const useStyles = makeStyles((theme) => ({
    balance: {
        textAlign: 'center',
        fontSize: '2em'
    }
}));

function CashFlowResume(props) {
    const classes = useStyles();
    return (
        <Card>
            <CardHeader
                title="Balanço"
            />
            <CardContent className={classes.balance}>
                {currencyFormat.format(props.balance)}
            </CardContent>
        </Card>
    );
}

export default CashFlowResume;