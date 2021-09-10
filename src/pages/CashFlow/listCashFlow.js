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
import CashFlowTypeEnum from '../../models/CashFlowTypeEnum';
import CashFlowTableRow from './CashFlowTableRow';
import CashFlowTableCell from './CashFlowTableCell';

const useStyles = makeStyles((theme) => ({
    pagination: {
        width: 'max-content'
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
                        <TableCell>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(row => (
                        <CashFlowTableRow
                            key={row.id}
                            cashFlowType={row.cashFlowType}
                        >
                            <CashFlowTableCell>
                                {CashFlowTypeEnum.getById(row.cashFlowType.id).name}
                            </CashFlowTableCell>
                            <CashFlowTableCell>
                                {row.description}
                            </CashFlowTableCell>
                            <CashFlowTableCell>
                                {currencyFormat.format(row.value)}
                            </CashFlowTableCell>
                            <CashFlowTableCell>
                                {(new Date(row.datetime)).toLocaleString()}
                            </CashFlowTableCell>
                            <CashFlowTableCell>
                                {row.recurrents_id ? 'Recorrente' : ''}
                            </CashFlowTableCell>
                            <CashFlowTableCell>
                                <IconButton
                                    onClick={() => handleDeleteItem(row.id)}
                                >
                                    <Delete/>
                                </IconButton>
                            </CashFlowTableCell>
                        </CashFlowTableRow>         
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                className={classes.pagination}
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