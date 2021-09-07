import {
    Route,
    Redirect
} from "react-router-dom";
import { useState } from 'react';
import authService from '../services/authService';

export default function AuthenticatedRoute({ children, ...rest }) {
    const [isLogged, setIsLogged] = useState(null);
    authService.isLoged().then(res => setIsLogged(res));
    if (isLogged === false) 
        return (
            <Redirect to="/login"/>
        );
    return (
        <Route {...rest}>
            {children}
        </Route>
    );
}