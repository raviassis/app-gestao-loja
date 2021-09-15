import { 
    Container,
    Card,
    CardHeader,
    CardContent,
    TextField,
    Button
} from '@material-ui/core/';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import VerticalForm from '../../components/VerticalForm';
import accountService from '../../services/accountService';

export default function BasicInfoCard() {
    const [account, setAccout] = useState({
        name: "",
        email: ""
    });
    const [accountForm, setAccountForm] = useState({
        name: "",
        email: ""
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        accountService
            .getMyAccount()
            .then(res => {setAccout(res.data); setAccountForm(res.data)})
            .finally(() => {setLoading(false)});
    }, []);

    function hasChange() {
        return account.name !== accountForm.name;
    }

    function handleSubmit(event) {
        event.preventDefault();
        const { name } = accountForm;
        accountService
            .update({ name })
            .then(res => {setAccout(res.data); setAccountForm(res.data); alert("Alteração salva");});
    }

    return (
        <Card>
            <CardHeader 
                title="Informações básicas"/>
            <CardContent>
                <Container maxWidth="sm">
                    <VerticalForm onSubmit={handleSubmit}>
                        {
                            loading
                            ? <Loading/>
                            : (
                                <>
                                <TextField 
                                    disabled 
                                    label="email" 
                                    value={accountForm.email} />
                                <TextField 
                                    label="Nome" 
                                    value={accountForm.name}
                                    onChange={(event) => setAccountForm({...accountForm, name: event.target.value})} />
                                <Button
                                    disabled={!hasChange()}
                                    type="submit"
                                    variant="contained" 
                                    color="primary">
                                    Salvar Alterações
                                </Button>
                                </>
                            )
                        }
                    </VerticalForm>
                </Container>
            </CardContent>
        </Card>
    );
}