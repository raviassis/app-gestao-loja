import api from './api';

const _url = '/auth';
const TOKEN='token';
const authService = {
    register({name, email, password}) {
        return api.post(`${_url}/register`, {name, email, password})
                    .then(res => {
                        localStorage.removeItem(TOKEN);
                        return res;
                    });
    },
    login({email, password}){
        return api.post(`${_url}/login`, {email, password}).then(res => {
            localStorage.setItem(TOKEN, res.data.token);
            return res;
        });
    },
    logout() {
        localStorage.removeItem(TOKEN);
        window.location.href = "/login";
    },
    isLoged() {
        const token = localStorage.getItem(TOKEN);
        if (!token) return Promise.resolve(false);
        
        return api.get(`${_url}/verify_token`).then(() => true).catch(() => false);
    },
    emailConfirmation(confirmation_token) {
        return api.post(`${_url}/email_confirmation/${confirmation_token}`);
    },
    resetPassword({newPassword, reset_token}) {
        return api.post(`${_url}/reset_password/${reset_token}`, { newPassword });
    },
    requestResetPassword(email) {
        return api.post(`${_url}/request_reset_password`, { email });
    }
}
export default authService;