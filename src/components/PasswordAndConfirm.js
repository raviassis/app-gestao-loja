import { useState, useEffect } from 'react';
import validator from 'validator';
import TextFieldPasswordWithValidator from './TextFieldPasswordWithValidator';

const MAX_FIELD_SIZE = 255;
export default function PasswordAndConfirm(props) {
    const {onChange, password, confirmPassword} = props;
    const setPassword = () => {};
    const setConfirmPassword = () => {};
    const [validationPasswordMessage, setValidationPasswordMessage] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState('');
    const [validationConfirmPasswordMessage, setValidationConfirmPasswordMessage] = useState("");

    function onChangePassword(event, validation){
        const {onChange} = props;
        const value = event.target.value;
        setPassword(value);
        setValidationPasswordMessage(validation.message);
        ValidConfirmPassword(value, confirmPassword);
        if (onChange) 
            onChange({
                password: value,
                validationPasswordMessage: validation.message,
                confirmPassword,
                validationConfirmPasswordMessage
            });
    }
    function onChangeConfirmPassword(event){
        const value = event.target.value;
        setConfirmPassword(value);
        ValidConfirmPassword(password, value);
        if (onChange) 
            onChange({
                password,
                validationPasswordMessage,
                confirmPassword: value,
                validationConfirmPasswordMessage
            });
    }

    const ValidConfirmPassword = (password, confirmPassword) => {
        if (validator.isEmpty(confirmPassword)) 
            setValidationConfirmPasswordMessage("Campo obrigatório.");
        else if (confirmPassword.length > MAX_FIELD_SIZE) 
            setValidationConfirmPasswordMessage("Campo muito longo.");
        else if(password !== confirmPassword) 
            setValidationConfirmPasswordMessage("A senha deve ser a mesma.");
        else setValidationConfirmPasswordMessage("");
    }

    useEffect(
        () => {
            if (onChange)
                onChange({
                    password,
                    validationPasswordMessage,
                    confirmPassword,
                    validationConfirmPasswordMessage
                });
        }, 
        [
            password, 
            confirmPassword, 
            validationPasswordMessage, 
            validationConfirmPasswordMessage, 
            onChange
        ]
    );

    return (
        <>
            <TextFieldPasswordWithValidator 
                label="Senha"
                value={password}
                onChange={onChangePassword}/>
            <TextFieldPasswordWithValidator 
                label="Confirmar Senha"
                value={confirmPassword}
                onChange={onChangeConfirmPassword}
                error={!!validationConfirmPasswordMessage}
                helperText={validationConfirmPasswordMessage}/>
        </>
    );
}