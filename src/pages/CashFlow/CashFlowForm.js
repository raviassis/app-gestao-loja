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
    Button,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    Radio
} from '@material-ui/core/';
import Autocomplete from '@material-ui/lab/Autocomplete';
import NumberFormat from 'react-number-format';
import CashFlowTypeEnum from './CashFlowTypeEnum';
import CashFlowService from '../../services/cashFlowService';

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
            marginBottom: '15px'
        }
    }
}));

let getSuggestedDescriptionsTimeout;

function CashFlowForm(props) {
    const classes = useStyles();
    const [cashFlowType, setCashFlowType] = useState(0);
    const [datetime, setDatetime] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState(0);
    const [suggestedDescriptions, setSuggestedDescriptions] = useState([]);
    const [recurrent, setRecurrent] = useState(false);
    const [recurrentCashFlowDay, setRecurrentCashFlowDay] = useState(1)

    async function handleClick() {
        const dt = datetime ? datetime : (new Date()).toISOString();
        await props.onSave({
            cashFlowType, 
            datetime: dt, 
            description, 
            value,
            recurrent,
            day: recurrentCashFlowDay
        });
        setCashFlowType(0);
        setDatetime('');
        setDescription('');
        setValue(0);
        setRecurrentCashFlowDay(1);
    }
    function handleRecurrentChange(event) {
        setRecurrent(event.target.value === 'true');
        setDatetime('');
        setRecurrentCashFlowDay(1);
    }
    function handleRecurrentCashflowDay(event) {
        let value = event.target.value;
        if(typeof value === 'string' && value !== '') {
            if(value > 28) value = 28;
            if(value < 1) value = 1;
        }
        setRecurrentCashFlowDay(value); 
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
                            <MenuItem value={CashFlowTypeEnum.INCOMING.id}>
                                {CashFlowTypeEnum.INCOMING.name}
                            </MenuItem>
                            <MenuItem value={CashFlowTypeEnum.OUTGOING.id}>
                                {CashFlowTypeEnum.OUTGOING.name}
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <Autocomplete
                        freeSolo
                        autoComplete
                        value={description}
                        options={suggestedDescriptions.map((option) => option.description)}
                        onInputChange={(_, value) => {
                            setDescription(value);
                            clearTimeout(getSuggestedDescriptionsTimeout);
                            getSuggestedDescriptionsTimeout = setTimeout(
                                () => {
                                    CashFlowService
                                        .getSuggestedDescriptions(value)
                                        .then(res => setSuggestedDescriptions(res.data));
                                }, 
                                700
                            );
                            
                        }}
                        renderInput={(params) => (
                        <TextField 
                            {...params} 
                            label="Descrição *"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        )}
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
                    <FormControl color='primary'>
                        <FormLabel>Repetir lançamento?</FormLabel>
                        <RadioGroup 
                            row
                            value={recurrent}
                            onChange={handleRecurrentChange}
                        >
                            <FormControlLabel 
                                value={false} 
                                control={<Radio/>}
                                label="Não"
                            />
                            <FormControlLabel 
                                value={true} 
                                control={<Radio/>}
                                label="Sim"
                            />
                        </RadioGroup>
                    </FormControl>
                    {
                        !recurrent ?
                        <TextField
                            type="datetime-local"
                            label="Data/Hora"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={datetime}
                            onChange={(event) => setDatetime(event.target.value)}
                        /> :
                        <TextField
                            type={'number'}
                            label='Dia do lançamento'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={recurrentCashFlowDay}
                            onChange={handleRecurrentCashflowDay}
                        />
                    }
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