import {
    TextField,
    Button,
    Typography
} from '@material-ui/core';
import { useState } from 'react';
import CentralizedCard from "../../components/CentralizedCard";
import VerticalForm from "../../components/VerticalForm";
import authService from '../../services/authService';
import Loading from '../../components/Loading';

export default function RequestResetPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        authService
            .requestResetPassword(email)
            .then(() => {
                alert("Email enviado.");
                setEmail("");
            })
            .catch(() => {
                alert('Não foi possível enviar o email.');
            })
            .finally(() => {
                setLoading(false);
            });
    }
    return (
        <CentralizedCard
            containerProps={{maxWidth: "xs"}} 
            cardHeaderProps={{title: "Recuperar minha senha"}}
        >
            <Typography component="p">
                Informe seu email e enviaremos o link onde você poderá cadastrar uma nova senha.
            </Typography>
            <VerticalForm onSubmit={handleSubmit}>
                <TextField 
                    label="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <Button
                    disabled={!email}
                    type="submit"
                    variant="contained" 
                    color="primary"
                >
                    Enviar email
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