import { 
    Container,
    Card,
    CardHeader,
    CardContent,
    Button
} from '@material-ui/core/';
import { useState } from 'react';
import VerticalForm from '../../components/VerticalForm';
import accountService from '../../services/accountService';
import PasswordAndConfirm from '../../components/PasswordAndConfirm';
import TextFieldPasswordWithValidator from '../../components/TextFieldPasswordWithValidator';

export default function ChangePasswordCard() {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [validationPasswordMessage, setValidationPasswordMessage] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validationConfirmPasswordMessage, setValidationConfirmPasswordMessage] = useState("");

    function handlePasswordAndConfirmChange({
        password, 
        validationPasswordMessage, 
        confirmPassword, 
        validationConfirmPasswordMessage
    }) {
        setNewPassword(password);
        setValidationPasswordMessage(validationPasswordMessage);
        setConfirmPassword(confirmPassword);
        setValidationConfirmPasswordMessage(validationConfirmPasswordMessage);
    }

    function handleSubmit(event){
        event.preventDefault();
        accountService
            .changePassword({password, newPassword})
            .then(() => {
                alert('Senha alterada com sucesso.');
                setPassword('');
                setNewPassword('');
                setValidationPasswordMessage('');
                setConfirmPassword('');
                setValidationConfirmPasswordMessage('');
            });
    }

    const isFormValid = () => {
        return !(
                    validationPasswordMessage
                    || validationConfirmPasswordMessage
                ) 
                && (newPassword && password && confirmPassword);
    };

    return (
        <Card>
            <CardHeader 
                title="Alterar senha"/>
            <CardContent>
                <Container maxWidth="sm">
                    <VerticalForm onSubmit={handleSubmit}>
                        <TextFieldPasswordWithValidator 
                            label="Senha atual"
                            value={password}
                            validation={(event) => {
                                const value = event.target.value;
                                return value ? "" : "Campo obrigatório.";
                            }}
                            onChange={(event) => setPassword(event.target.value)}/>
                        <PasswordAndConfirm 
                            password={newPassword}
                            confirmPassword={confirmPassword}
                            onChange={handlePasswordAndConfirmChange}/>
                        <Button
                            disabled={!isFormValid()}
                            type="submit"
                            variant="contained" 
                            color="primary">
                            Alterar Senha
                        </Button>
                    </VerticalForm>
                </Container>
            </CardContent>
        </Card>
    );
}