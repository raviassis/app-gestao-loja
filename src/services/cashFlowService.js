import api from './api';

const _url = '/cashflow';
const cashFlowService = {
    get({begin, end, limit, offset}) {
        begin = begin || null;
        end = end || null;
        return api.get(_url, { params: {begin, end, limit, offset}});
    },
    getBalance({begin, end}) {
        begin = begin || null;
        end = end || null;
        return api.get(`${_url}/balance`, {params: {begin, end}});
    },
    post({cashFlowType, datetime, description, value}) {
        return api.post(_url, {cashFlowType, datetime, description, value});
    },
    delete(id) {
        return api.delete(`${_url}/${id}`);
    }
};

export default cashFlowService;
