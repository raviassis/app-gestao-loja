import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardHeader,
    CardContent,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    IconButton
} from '@material-ui/core/';
import Delete from '@material-ui/icons/Delete';
import RecurrentService from '../../services/recurrentService';
import constants from '../../shared/constants';
import CashFlowTypeEnum from './CashFlowTypeEnum';
import currencyFormat from '../../services/currencyFormatService';
import CashFlowTableRow from './CashFlowTableRow';
import CashFlowTableCell from './CashFlowTableCell';

const useStyles = makeStyles((theme) => ({
    content: {
        overflow: 'auto'
    },
    pagination: {
        width: 'max-content'
    }
}));

function ListRecurrents(props) {
    const classes = useStyles();
    const rowsPerPageOptions = [5, 10, 20];
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions[0]);
    const [total, setTotal] = React.useState(0);
    const [data, setData] = React.useState([]);
    const [runEffect, setRunEffect] = React.useState(0);

    React.useEffect(() => {
        RecurrentService.get({
            limit: rowsPerPage, 
            offset: page * rowsPerPage
        }).then(res => {
            const {data, total} = res.data;
            setData(data);
            setTotal(total || 0);
        });
    }, [rowsPerPage, page, runEffect]);

    function handleDeleteItem(id) {
        RecurrentService
            .delete(id)
            .then(() => setRunEffect(runEffect + 1))
            .catch(err => alert(constants.MSG.ERROR)); 
    }

    return (
        <Card>
            <CardHeader
                title="Lançamentos Recorrentes"
            />
            <CardContent className={classes.content}>
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
                                Dia de Lançamento
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
                                    {row.day}
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
                    onChangePage={(_, page) => setPage(page)}
                    onChangeRowsPerPage={(event) => setRowsPerPage(event.target.value)}
                />
            </CardContent>
        </Card>
    );
}
export default ListRecurrents;