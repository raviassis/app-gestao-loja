import { makeStyles } from '@material-ui/core/styles';
import {
    TableCell,
} from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
    cell: {
        color: 'inherit'
    },
}));
export default function CashFlowTableCell(props) {
    const classes = useStyles(); 
    return (
        <TableCell className={classes.cell}>
            {props.children}
        </TableCell>
    );
}