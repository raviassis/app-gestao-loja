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

function ListCashFlow() {
    const classes = useStyles();
    const rowsPerPageOptions = [5, 10, 20];
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions[0]);
    const [data, setData] = React.useState([]);
    const [total, setTotal] = React.useState(0);    
    const getFlowClass = (cashFlowType) => {
        if (cashFlowType.id === 0) return classes.flowIncoming;
        else if (cashFlowType.id === 1) return classes.flowOutgoing;
    }
    async function handleDeleteItem(id) {
        try {
            await cashFlowService.delete(id);
            window.location.reload();
        } catch (err) {
            alert(constants.MSG.ERROR);
        }        
    }
    React.useEffect(() => {
        async function fetchData() {
            const {data} = await cashFlowService.get(rowsPerPage, page * rowsPerPage);
            setTotal(data.total);
            setData(data.data);
        }
        fetchData();
    }, [rowsPerPage, page]);
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
                                {row.cashFlowType.name}
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
                onChangePage={(_, page) => setPage(page)}
                onChangeRowsPerPage={(event) => setRowsPerPage(event.target.value)}
            />
        </TableContainer>
    );
}

export default ListCashFlow;