import api from './api';

const _url = '/registers';
const registerService = {
    getRegisters({ q, limit, offset} = {}) {
        return api.get(_url, {params: {q, limit, offset}});
    }
};
export default registerService;