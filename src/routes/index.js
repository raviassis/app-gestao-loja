import Home from '../pages/Home';
import Register from '../pages/Register';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import Login from '../pages/Login';
import AuthenticatedRoute from './AuthenticatedRoute';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>                
                <Route path="/login" exact component={Login}/>
                <Route path="/register" exact component={Register} />
                <AuthenticatedRoute path="/">
                    <Switch>
                        <Route path="/" component={Home}/>
                    </Switch>
                </AuthenticatedRoute>
            </Switch>
        </BrowserRouter>
    );
}