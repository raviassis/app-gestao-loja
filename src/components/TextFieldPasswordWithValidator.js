import TextFieldPassword from "./TextFieldPassword";
import validator from 'validator';
import { useState } from 'react';

const MAX_FIELD_SIZE = 255;
const STRONG_PASSWORD_MESSAGE = `
    A senha deve ter no mínimo 8 caracteres, 1 letra minúscula, 1 letra maiúscula e 1 simbolo. 
`;

export default function TextFieldPasswordWithValidator(props){
    const [validationMessage, setValidationMessage] = useState("");
    const textFieldPasswordProps = {...props};
    delete textFieldPasswordProps.onChange;
    delete textFieldPasswordProps.validation;

    function passwordValidation(password) {
        if (validator.isEmpty(password)) 
            return "Campo obrigatório.";
        else if (password.length > MAX_FIELD_SIZE) 
            return "Campo muito longo.";
        else if(!validator.isStrongPassword(password)) 
            return STRONG_PASSWORD_MESSAGE;
        else return "";
    }

    function handleOnChange(event) {
        const { onChange, validation } = props;
        let validationMessage = "";
        if (validation) {
            validationMessage = validation(event, passwordValidation);
        } else {
            validationMessage = passwordValidation(event.target.value);
        }
        
        setValidationMessage(validationMessage);
        if (onChange) {
            onChange(event, {valid: !validationMessage, message: validationMessage});
        }
        
    }
    return (
        <TextFieldPassword 
            onChange={handleOnChange}
            error={!!validationMessage}
            helperText={validationMessage}
            {...textFieldPasswordProps}/>
    );
}