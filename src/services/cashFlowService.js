import api from './api';

const _url = '/cashflow';
const cashFlowService = {
    get(limit, offset) {
        return api.get(_url, { params: {limit, offset}});
    },
    post({cashFlowType, datetime, description, value}) {
        return api.post(_url, {cashFlowType, datetime, description, value});
    },
    delete(id) {
        return api.delete(`${_url}/${id}`);
    }
};

export default cashFlowService;
