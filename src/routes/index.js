import Home from '../pages/Home';
import Register from '../pages/Register';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import Login from '../pages/Login';
import AuthenticatedRoute from './AuthenticatedRoute';
import EmailConfirmation from '../pages/EmailConfirmation';
import ResetPassword from '../pages/ResetPassword';
import RequestResetPassword from '../pages/RequestResetPassword';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>                
                <Route path="/login" exact component={Login}/>
                <Route path="/register" exact component={Register} />
                <Route path="/email_confirmation/:confirmation_token" component={EmailConfirmation}/>
                <Route path="/reset_password/:reset_token" component={ResetPassword}/>
                <Route path="/request_reset_password" component={RequestResetPassword}/>
                <AuthenticatedRoute path="/">
                    <Switch>
                        <Route path="/" component={Home}/>
                    </Switch>
                </AuthenticatedRoute>
            </Switch>
        </BrowserRouter>
    );
}