import api from './api';

const _url = '/account';
const accountService = {
    getMyAccount() {
        return api.get(`${_url}/me`);    
    },
    update({ name }) {
        return api.put(`${_url}/update`, { name });
    },
    changePassword({password, newPassword}) {
        return api.put(`${_url}/change_password`, {password, newPassword});
    }
};
export default accountService;