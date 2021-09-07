import {
    Card,
    CardHeader,
    CardContent,
    TextField,
    Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect, useCallback } from 'react';
import VerticalForm from '../../components/VerticalForm';
import validator from 'validator';
import PasswordAndConfirm from '../../components/PasswordAndConfirm';
import authService from '../../services/authService';
import { useHistory } from "react-router-dom";
import Loading from '../../components/Loading';
import CentralizedContainer from '../../components/CentralizedContainer';

const useStyles = makeStyles((theme) => ({
    container: {
        '& form > *': {
            marginBottom: '25px'
        }
    }, 
    loadingField: {
        display: 'flex',
        justifyContent: 'center'
    }
}));

function Register(props) {
    const MAX_FIELD_SIZE = 255;
    const classes = useStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [validationNameMessage, setValidationNameMessage] = useState("");
    const handleOnChangeName = (event) => {
        const name = event.target.value;
        setName(name);
        baseFieldValidation(name, setValidationNameMessage);
    };
    const baseFieldValidation = (name, setValidationMessage) => {
        if (validator.isEmpty(name)) setValidationMessage("Campo obrigatório.");
        else if (name.length > MAX_FIELD_SIZE) setValidationMessage("Campo muito longo.");
        else setValidationMessage("");
    }

    const [email, setEmail] = useState('');
    const [validationEmailMessage, setValidationEmailMessage] = useState("");
    const handleOnChangeEmail = (event) => {
        const email = event.target.value;
        setEmail(email);
        emailValidation(email);
    };
    const emailValidation = (email) => {
        if (validator.isEmpty(email)) 
            setValidationEmailMessage("Campo obrigatório.");
        else if (email.length > MAX_FIELD_SIZE) 
            setValidationEmailMessage("Campo muito longo.");
        else if(!validator.isEmail(email)) 
            setValidationEmailMessage("Deve ser um email");
        else setValidationEmailMessage("");
    }

    const [password, setPassword] = useState('');
    const [validationPasswordMessage, setValidationPasswordMessage] = useState("");

    const [confirmPassword, setConfirmPassword] = useState('');
    const [validationConfirmPasswordMessage, setValidationConfirmPasswordMessage] = useState("");

    const confirmPasswordValidation = useCallback(() => {
        if (validator.isEmpty(confirmPassword)) 
            setValidationConfirmPasswordMessage("Campo obrigatório.");
        else if (confirmPassword.length > MAX_FIELD_SIZE) 
            setValidationConfirmPasswordMessage("Campo muito longo.");
        else if(password !== confirmPassword) 
            setValidationConfirmPasswordMessage("A senha deve ser a mesma.");
        else setValidationConfirmPasswordMessage("");
    }, [password, confirmPassword]);

    function handlePasswordAndConfirmChange({
        password, 
        validationPasswordMessage, 
        confirmPassword, 
        validationConfirmPasswordMessage
    }) {
        setPassword(password);
        setValidationPasswordMessage(validationPasswordMessage);
        setConfirmPassword(confirmPassword);
        setValidationConfirmPasswordMessage(validationConfirmPasswordMessage);
    } 

    useEffect(() => {
        if (password && confirmPassword)
            confirmPasswordValidation(confirmPassword);
    }, [password, confirmPassword, confirmPasswordValidation]);

    const isFormValid = () => {
        return !(validationNameMessage 
               || validationEmailMessage
               || validationPasswordMessage
               || validationConfirmPasswordMessage) && 
               (name && email && password && confirmPassword);
    };

    const handleSubmit = (event) => {
        const formRegister = { name, email, password };
        setLoading(true);
        authService
            .register(formRegister)
            .then(() => {
                alert("Cadastro realizado com sucesso");
                history.push("/login");
            })
            .finally(() => {
                setLoading(false);
            });
        event.preventDefault();
    }

    return (
        <CentralizedContainer className={classes.container} maxWidth="sm">
            <Card>
                <CardHeader
                    title="Cadastro"
                />
                <CardContent>
                    <VerticalForm onSubmit={handleSubmit}>
                        <TextField 
                            label="Nome"
                            value={name}
                            onChange={handleOnChangeName}
                            error={!!validationNameMessage}
                            helperText={validationNameMessage}
                        />
                        <TextField 
                            label="Email"
                            value={email}
                            onChange={handleOnChangeEmail}
                            error={!!validationEmailMessage}
                            helperText={validationEmailMessage}/>
                        <PasswordAndConfirm 
                            password={password}
                            confirmPassword={confirmPassword}
                            onChange={handlePasswordAndConfirmChange}
                        />
                        <Button
                            disabled={!isFormValid()}
                            variant="contained" 
                            color="primary"
                            type="submit"
                        >
                            Cadastrar
                        </Button>
                    </VerticalForm>
                    {
                        loading && 
                        (
                            <div className={classes.loadingField}>
                                <Loading/> 
                            </div>
                        )
                    }
                    
                </CardContent>
            </Card>
        </CentralizedContainer>
    );
}

export default Register;