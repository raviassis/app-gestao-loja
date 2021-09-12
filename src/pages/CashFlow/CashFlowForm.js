import { useState, useEffect } from 'react';
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
import NumberFormat from 'react-number-format';
import CashFlowTypeEnum from '../../models/CashFlowTypeEnum';
import TypeRegisterDescription from '../../models/TypeRegisterDescriptionEnum';
import VerticalForm from '../../components/VerticalForm';
import Loading from '../../components/Loading';
import accountService from '../../services/accountService';
import RegisterAutoComplete from '../../components/RegisterAutoComplete';
import DescriptionAutoComplete from '../../components/DescriptionAutoComplete';

function CashFlowForm(props) {
    const [loading, setLoading] = useState(true);
    const [cashFlowType, setCashFlowType] = useState(0);
    const [datetime, setDatetime] = useState('');
    const [description, setDescription] = useState('');
    const [register, setRegister] = useState(null);
    const [value, setValue] = useState(0);
    const [recurrent, setRecurrent] = useState(false);
    const [recurrentCashFlowDay, setRecurrentCashFlowDay] = useState(1);
    const [userConfig, setUserConfig] = useState({typeRegisterDescription: TypeRegisterDescription.DEFINED_DESCRIPTIONS});
    
    useEffect(() => {
        accountService
            .getUserConfig()
            .then(res => {
                const userConfig = res.data;
                userConfig.typeRegisterDescription = TypeRegisterDescription
                                                        .getById(userConfig.typeRegisterDescription.id);
                setUserConfig(userConfig);
                setLoading(false);
            });
    }, []);

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
        setRegister(null);
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
    function renderDescription() {
        const {typeRegisterDescription} = userConfig;
        if (typeRegisterDescription.id === TypeRegisterDescription.DEFINED_DESCRIPTIONS.id) {
            return (
                <RegisterAutoComplete
                    label="Descrição *"
                    value={register}
                    onChange={(_, value) => {
                        setRegister(value);
                        setDescription(value && value.name ? value.name : '');
                    }}
                />
            );
        } else {
            return (
                <DescriptionAutoComplete
                    label="Descrição *"
                    value={description}
                    onChange={(_, value) => {
                        setDescription(value);
                    }}
                />
            );
        }
    }
    function isFormValid() {
        return cashFlowType !== 0 &&
                description.length > 0 &&
                value > 0 &&
                (
                    !recurrent ||
                    (
                        recurrentCashFlowDay >= 1 && 
                        recurrentCashFlowDay <= 28
                    )
                );
    }
    function renderForm() {
        return (
            <VerticalForm>
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
                {renderDescription()}
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
                    disabled={!isFormValid()}
                    onClick={handleClick}
                    variant="contained" 
                    color="primary">
                    Salvar
                </Button>
            </VerticalForm>
        );
    }
    return (
        <Card>
            <CardHeader
                title="Registrar Lançamento"
            />
            <CardContent>
                {
                    loading
                    ? ( <Loading/> )
                    : renderForm()
                }
                

            </CardContent>            
        </Card>        
    );
}

export default CashFlowForm;