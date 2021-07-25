import { makeStyles } from '@material-ui/core/styles';
import {
    TableRow,
} from '@material-ui/core/';
import CashFlowTypeEnum from './CashFlowTypeEnum';

const useStyles = makeStyles((theme) => ({
    flowIncoming: {
        color: 'green'
    },
    flowOutgoing: {
        color: 'red'
    },
}));

export default function CashFlowTableRow(props) {
    const classes = useStyles(); 
    const {children, cashFlowType} = props;
    const getFlowClass = (cashFlowType) => {
        if (cashFlowType.id === CashFlowTypeEnum.INCOMING.id) return classes.flowIncoming;
        else if (cashFlowType.id === CashFlowTypeEnum.OUTGOING.id) return classes.flowOutgoing;
    }
    return (
        <TableRow 
            {...props}
            className={getFlowClass(cashFlowType)}>
            {children}
        </TableRow>
    );
}