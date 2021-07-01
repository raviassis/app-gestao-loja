import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Container,
} from '@material-ui/core/';
import ListCashFlow from './listCashFlow';
import CashFlowForm from './CashFlowForm';
import cashFlowService from '../../services/cashFlowService';

const useStyles = makeStyles((theme) => ({
    container: {
        '& > *': {
            marginBottom: '15px'
        }
    }
}));

function CashFlow() {
    const classes = useStyles();
    async function onSave(cashFlow) {
        try {
            await cashFlowService.post(cashFlow);
            window.location.reload();
        } catch (err) {
            alert('Ocorreu um erro inesperado. Tente novamente mais tarde.');
        }
    }
    return (
        <Container className={classes.container} maxWidth="lg">
            <h1 className={classes.title}>Fluxo de caixa</h1>
            <CashFlowForm onSave={onSave}/>
            <ListCashFlow/>
        </Container>        
    );
}

export default CashFlow;