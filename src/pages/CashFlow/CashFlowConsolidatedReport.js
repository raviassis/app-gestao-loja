import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction
} from '@material-ui/core/';
import CashFlowTypeEnum from './CashFlowTypeEnum';
import currencyFormat from '../../services/currencyFormatService';

function CashFlowConsolidatedReport(props) {
    const {consolidatedReport} = props;
    const incomings = consolidatedReport.filter(c => c.cashFlowType.id === CashFlowTypeEnum.INCOMING.id);
    const outgoings = consolidatedReport.filter(c => c.cashFlowType.id === CashFlowTypeEnum.OUTGOING.id);
    function renderRegister(c) {
        const isIncoming = c.cashFlowType.id === CashFlowTypeEnum.INCOMING.id;
        const value = isIncoming ? c.sum : -c.sum;
        return (
            <ListItem key={c.description}>
                <ListItemText>
                    {c.description}:
                </ListItemText> 
                <ListItemSecondaryAction>
                    {currencyFormat.format(value)}
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
    function renderTotal(arr, cashFlowTypeEnum) {
        let total = arr.map(a => a.sum || 0).reduce((a1, a2) => a1 + a2, 0);
        total = CashFlowTypeEnum.INCOMING.id === cashFlowTypeEnum.id ? total: -total;
        return (
            <ListItem key='total'>
                <ListItemText>
                    Total:
                </ListItemText> 
                <ListItemSecondaryAction>
                    {currencyFormat.format(total)}
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
    return (
        <Card>
            <CardHeader
                title="Relatório Consolidado"
            />
            <CardContent>
                <div>
                    <Typography>Entradas</Typography>
                    <Divider/>
                    <List>
                        {incomings.map(renderRegister)}
                        {renderTotal(incomings, CashFlowTypeEnum.INCOMING)}
                    </List>
                </div>
                <div>
                    <Typography>Saídas</Typography>
                    <Divider/>
                    <List>
                        {outgoings.map(renderRegister)}
                        {renderTotal(outgoings, CashFlowTypeEnum.OUTGOING)}
                    </List>
                </div>
                

            </CardContent>
        </Card>
    );
}

export default CashFlowConsolidatedReport;