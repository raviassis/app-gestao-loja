import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    TablePagination,
    IconButton
} from '@material-ui/core/';
import Delete from '@material-ui/icons/Delete';
import cashFlowService from '../../services/cashFlowService';
import currencyFormat from '../../services/currencyFormatService';
import constants from '../../shared/constants';
import CashFlowTypeEnum from './CashFlowTypeEnum';

const useStyles = makeStyles((theme) => ({
    flowIncoming: {
        color: 'green'
    },
    flowOutgoing: {
        color: 'red'
    },
    cell: {
        color: 'inherit'
    }
}));

function ListCashFlow(props) {
    const classes = useStyles(); 
    const {
        rowsPerPageOptions,
        page,
        rowsPerPage,
        data,
        total
    } = props;
    const getFlowClass = (cashFlowType) => {
        if (cashFlowType.id === CashFlowTypeEnum.INCOMING.id) return classes.flowIncoming;
        else if (cashFlowType.id === CashFlowTypeEnum.OUTGOING.id) return classes.flowOutgoing;
    }
    async function handleDeleteItem(id) {
        try {
            await cashFlowService.delete(id);
            window.location.reload();
        } catch (err) {
            alert(constants.MSG.ERROR);
        }        
    }
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Lançamento
                        </TableCell>
                        <TableCell>
                            Descrição
                        </TableCell>
                        <TableCell>
                            Valor
                        </TableCell>
                        <TableCell>
                            Data
                        </TableCell>
                        <TableCell>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(row => (
                    <TableRow className={getFlowClass(row.cashFlowType)} key={row.id}>
                            <TableCell className={classes.cell} >
                                {CashFlowTypeEnum.getById(row.cashFlowType.id).name}
                            </TableCell>
                            <TableCell className={classes.cell}>
                                {row.description}
                            </TableCell>
                            <TableCell className={classes.cell}>
                                {currencyFormat.format(row.value)}
                            </TableCell>
                            <TableCell className={classes.cell}>
                                {(new Date(row.datetime)).toLocaleString()}
                            </TableCell>
                            <TableCell>
                                <IconButton
                                    onClick={() => handleDeleteItem(row.id)}
                                >
                                    <Delete/>
                                </IconButton>
                            </TableCell>
                        </TableRow>         
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={total}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={(_, page) => props.onChangePage(page)}
                onChangeRowsPerPage={(event) => props.onChangeRowsPerPage(event.target.value)}
            />
        </TableContainer>
    );
}

export default ListCashFlow;