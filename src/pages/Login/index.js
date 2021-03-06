import {
    TextField,
    Button
} from '@material-ui/core';
import { useState } from 'react';
import TextFieldPassword from '../../components/TextFieldPassword';
import VerticalForm from '../../components/VerticalForm';
import Loading from '../../components/Loading';
import authService from '../../services/authService';
import { useHistory } from "react-router-dom";
import CentralizedCard from '../../components/CentralizedCard';

function Login() {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    function handleSubmit(event) {
        setLoading(true);
        authService.login({email, password})
            .then(() => {
                history.push('/');
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    alert(error.response.data.errors[0].msg);
                }
            })
            .finally(() => {
                setLoading(false);
            });
        event.preventDefault();
    }
    return (
        <CentralizedCard
            containerProps={{maxWidth: "xs"}} 
            cardHeaderProps={{title: "Login"}}
        >
            <VerticalForm onSubmit={handleSubmit}>
                <TextField 
                    label="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}/>
                <TextFieldPassword 
                    label="Senha"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}/>
                <Button
                    type="submit"
                    variant="contained" 
                    color="primary"
                >
                    Login
                </Button>
                <Button href="/register">Criar conta</Button>
                <Button href="/request_reset_password">Esqueci minha senha</Button>
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

export default Login;