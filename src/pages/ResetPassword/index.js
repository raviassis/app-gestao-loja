import {
    useParams,
    useHistory
} from "react-router-dom";
import {
    Button
} from '@material-ui/core';
import CentralizedCard from "../../components/CentralizedCard";
import { useState } from "react";
import Loading from "../../components/Loading";
import authService from "../../services/authService";
import VerticalForm from "../../components/VerticalForm";
import PasswordAndConfirm from "../../components/PasswordAndConfirm";

export default function ResetPassword() {
    let { reset_token } = useParams();
    const history = useHistory();
    const [ loading, setLoading ] = useState(false);
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

    const isFormValid = () => {
        return !(
                    validationPasswordMessage
                    || validationConfirmPasswordMessage
                ) 
                && (newPassword && confirmPassword);
    };

    function handleSubmit(event){
        event.preventDefault();
        setLoading(true);
        authService
            .resetPassword({newPassword, reset_token})
            .then(() => {
                alert('Senha alterada com sucesso.');
                history.push('/');
            }).catch((error) => {
                if (error.response.status === 401) {
                    alert(error.response.data.errors[0].msg);
                } else
                    alert('Não foi possível alterar a senha.');
            }).finally(() => {
                setLoading(false);
            });
    }

    return (
        <CentralizedCard 
            containerProps={{maxWidth: "xs"}} 
            cardHeaderProps={{title: "Alterar senha"}}
        >
            <VerticalForm onSubmit={handleSubmit}>
                <PasswordAndConfirm 
                    password={newPassword}
                    confirmPassword={confirmPassword}
                    onChange={handlePasswordAndConfirmChange} />
                <Button
                    disabled={!isFormValid()}
                    type="submit"
                    variant="contained" 
                    color="primary">
                    Alterar Senha
                </Button>
            </VerticalForm>    
            {
                loading && 
                (
                    <Loading/>
                )
            }   
        </CentralizedCard>       
    );
}