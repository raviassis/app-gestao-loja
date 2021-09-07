import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Container,
} from '@material-ui/core/';
import ListCashFlow from './listCashFlow';
import CashFlowForm from './CashFlowForm';
import CashFlowFilter from './CashFlowFilter';
import CashFlowResume from './CashFlowResume';
import cashFlowService from '../../services/cashFlowService';
import recurrentService from '../../services/recurrentService';
import CashFlowTypeEnum from './CashFlowTypeEnum';
import CashFlowConsolidatedReport from './CashFlowConsolidatedReport';
import ListRecurrents from './ListRecurrents';

const useStyles = makeStyles((theme) => ({
    container: {
        '& > *': {
            marginBottom: '15px'
        }
    }
}));

function CashFlow(props) {
    const FILTER_CLEAN = {
        cashFlowType: CashFlowTypeEnum.ALL.id,
        begin: '',
        end: ''
    };
    const classes = useStyles();
    const rowsPerPageOptions = [5, 10, 20];
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions[0]);
    const [data, setData] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const [balance, setBalance] = React.useState(0);    
    const [filter, setFilter] = React.useState(FILTER_CLEAN);
    const [consolidatedReport, setConsolidatedReport] = React.useState([]); 
    async function onSaveCashFlow(cashFlow) {
        try {
            await cashFlowService.post(cashFlow);
            window.location.reload();
        } catch (err) {
            alert('Ocorreu um erro inesperado. Tente novamente mais tarde.');
        }
    }
    async function onSaveRecurrent(recurrent) {
        try {
            await recurrentService.post(recurrent);
            window.location.reload();
        } catch (err) {
            alert('Ocorreu um erro inesperado. Tente novamente mais tarde.');
        }
    }
    async function onSave(cashFlow) {
        if (cashFlow.recurrent)
            await onSaveRecurrent(cashFlow);
        else 
            await onSaveCashFlow(cashFlow);
    }
    React.useEffect(() => {    
        async function fetchBalanceData() {
            const {data} = await cashFlowService.getBalance(filter);
            setBalance(data.balance);
        }
        async function fetchData() {        
            const {data} = await cashFlowService.get({ 
                ...filter, 
                limit: rowsPerPage, 
                offset: page * rowsPerPage
            });
            setTotal(data.total);
            setData(data.data);
        }    
        async function fetchConsolidatedReport() {
            const {data} = await cashFlowService.getConsolidatedReport(filter);
            setConsolidatedReport(data.data);
        }
        fetchBalanceData();
        fetchData();
        fetchConsolidatedReport();
    }, [filter, rowsPerPage, page]);
    return (
        <Container className={classes.container} maxWidth="lg">
            <h1>Fluxo de caixa</h1>
            <CashFlowForm onSave={onSave}/>
            <CashFlowFilter 
                filter={filter}
                onApply={setFilter}
                onClear={() => setFilter(FILTER_CLEAN)}
            />
            <CashFlowResume balance={balance}/>
            <CashFlowConsolidatedReport
                consolidatedReport={consolidatedReport}
            />
            <ListCashFlow
                rowsPerPageOptions={rowsPerPageOptions}
                page={page}
                rowsPerPage={rowsPerPage}
                data={data}
                total={total}
                onChangePage={setPage}
                onChangeRowsPerPage={setRowsPerPage}
            />
            <ListRecurrents/>
        </Container>        
    );
}

export default CashFlow;