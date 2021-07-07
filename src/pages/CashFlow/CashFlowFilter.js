import React from 'react';
import {
    makeStyles,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    TextField,
    // FormControl,
    // InputLabel,
    // Select,
    // MenuItem,
    Button,
} from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
            marginBottom: '15px'
        }
    }
}));

function CashFlowFilter(props) {
    const classes = useStyles();
    let {filter} = props;
    const [begin, setBegin] = React.useState(filter.begin);
    const [end, setEnd] = React.useState(filter.end);
    const [cashFlowType, setCashFlowType] = React.useState(filter.cashFlowType);
    function onApply() {
        props.onApply({begin, end, cashFlowType});
    }
    function onClear() {
        props.onClear();
        setBegin('');
        setEnd('');
        setCashFlowType('');
    }
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Filtros</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <form className={classes.form}>
                    {/* <FormControl>
                        <InputLabel shrink>Tipo</InputLabel>
                        <Select
                            displayEmpty
                            value={cashFlowType}
                            onChange={(event) => setCashFlowType(event.target.value)}
                        >
                            <MenuItem value="">
                                Todos
                            </MenuItem>
                            <MenuItem value={0}>Entrada</MenuItem>
                            <MenuItem value={1}>Saída</MenuItem>
                        </Select>
                    </FormControl> */}
                    <TextField
                        label="Início"
                        type="datetime-local"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(event) => setBegin(event.target.value)}
                        value={begin}
                    />
                    <TextField
                        label="Fim"
                        type="datetime-local"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(event) => setEnd(event.target.value)}
                        value={end}
                    />
                    <Button 
                        onClick={onApply}
                        variant="contained" 
                        color="primary">
                        Aplicar
                    </Button>
                    <Button 
                        onClick={onClear}
                        variant="contained" 
                    >
                        Limpar
                    </Button>
                </form>
            
            </AccordionDetails>
        </Accordion>
    );
}

export default CashFlowFilter;