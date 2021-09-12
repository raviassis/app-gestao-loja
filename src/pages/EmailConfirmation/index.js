import {
    useParams
} from "react-router-dom";
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button
} from '@material-ui/core';
import CentralizedContainer from '../../components/CentralizedContainer';
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import authService from "../../services/authService";

export default function EmailConfirmation() {
    let { confirmation_token } = useParams();
    const [ loading, setLoading ] = useState(true);
    const [ confirmadedEmail, setConfirmadedEmail] = useState(false);

    useEffect(() => {
        authService
            .emailConfirmation(confirmation_token)
            .then(() => setConfirmadedEmail(true))
            .finally(() => setLoading(false))
    });

    function renderContent() {
        return (
            <>
                <Typography style={{textAlign: 'center'}} variant="h4" component="h1">
                    {
                        confirmadedEmail 
                        ? "Email confirmado com sucesso!" 
                        : "Não foi possível confirmar o email." 
                    }  
                </Typography>  
                <CardActions style={{justifyContent: 'center'}}>
                    {
                        confirmadedEmail 
                        && <Button href="/login" color="primary">Fazer login</Button>
                    } 
                </CardActions>  
            </>
        );
    }

    return (
        <CentralizedContainer maxWidth="sm">
            <Card>
                <CardContent>
                    {
                        loading
                        ? (
                            <Loading/>
                        ) : renderContent()
                    }              
                </CardContent>
            </Card>
        </CentralizedContainer>        
    );
}