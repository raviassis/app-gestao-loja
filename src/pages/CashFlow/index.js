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
import CashFlowTypeEnum from './CashFlowTypeEnum';
import CashFlowConsolidatedReport from './CashFlowConsolidatedReport';

const useStyles = makeStyles((theme) => ({
    container: {
        '& > *': {
            marginBottom: '15px'
        }
    }
}));

function CashFlow() {
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
    async function onSave(cashFlow) {
        try {
            await cashFlowService.post(cashFlow);
            window.location.reload();
        } catch (err) {
            alert('Ocorreu um erro inesperado. Tente novamente mais tarde.');
        }
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
            console.log(data.data);
        }
        fetchBalanceData();
        fetchData();
        fetchConsolidatedReport();
    }, [filter, rowsPerPage, page]);
    return (
        <Container className={classes.container} maxWidth="lg">
            <h1 className={classes.title}>Fluxo de caixa</h1>
            <CashFlowForm onSave={onSave}/>
            <CashFlowFilter 
                filter={filter}
                onApply={setFilter}
                onClear={() => setFilter(FILTER_CLEAN)}
            />
            <CashFlowResume balance={balance}/>
            <ListCashFlow
                rowsPerPageOptions={rowsPerPageOptions}
                page={page}
                rowsPerPage={rowsPerPage}
                data={data}
                total={total}
                onChangePage={setPage}
                onChangeRowsPerPage={setRowsPerPage}
            />
            <CashFlowConsolidatedReport
                consolidatedReport={consolidatedReport}
            />
        </Container>        
    );
}

export default CashFlow;