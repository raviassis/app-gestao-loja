import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardHeader,
    CardContent,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Button
} from '@material-ui/core/';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
            marginBottom: '15px'
        }
    }
}));

function CashFlowForm(props) {
    const classes = useStyles();
    const [cashFlowType, setCashFlowType] = useState(0);
    const [datetime, setDatetime] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState(0);

    async function handleClick() {
        const dt = datetime ? datetime : (new Date()).toISOString();
        await props.onSave({cashFlowType, datetime: dt, description, value});
        setCashFlowType(0);
        setDatetime('');
        setDescription('');
        setValue(0);
    }
    return (
        <Card>
            <CardHeader
                title="Registrar Lançamento"
            />
            <CardContent>
                <form className={classes.form}>
                    <FormControl
                    >
                        <InputLabel>Tipo *</InputLabel>
                        <Select
                            value={cashFlowType}
                            onChange={(event) => setCashFlowType(event.target.value)}
                        >
                            <MenuItem value={0}>Entrada</MenuItem>
                            <MenuItem value={1}>Saída</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        type="text"
                        label="Descrição *"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                    <NumberFormat 
                        prefix={'R$'}
                        thousandSeparator='.'
                        decimalSeparator=','
                        decimalScale={2}
                        allowNegative={false}
                        value={value}
                        onValueChange={(valuesObj) => {setValue(valuesObj.floatValue)}}
                        fixedDecimalScale={true}
                        label="Valor *"
                        customInput={TextField}
                    />
                    <TextField
                        type="datetime-local"
                        label="Data/Hora"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={datetime}
                        onChange={(event) => setDatetime(event.target.value)}
                    />
                    <Button 
                        onClick={handleClick}
                        variant="contained" 
                        color="primary">
                        Salvar
                    </Button>
                </form>

            </CardContent>            
        </Card>        
    );
}

export default CashFlowForm;