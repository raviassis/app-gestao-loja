import api from './api';

const _url = '/cashflow';
const cashFlowService = {
    get({cashFlowType, begin, end, limit, offset}) {
        begin = begin || null;
        end = end || null;
        cashFlowType = cashFlowType || null;
        return api.get(_url, { params: {cashFlowType, begin, end, limit, offset}});
    },
    getBalance({cashFlowType, begin, end}) {
        begin = begin || null;
        end = end || null;
        cashFlowType = cashFlowType || null;
        return api.get(`${_url}/balance`, {params: {cashFlowType, begin, end}});
    },
    getSuggestedDescriptions(description) {
        return api.get(`${_url}/suggestedDescriptions`, {params: {description}});
    },
    getConsolidatedReport({begin, end}) {
        begin = begin || null;
        end = end || null;
        return api.get(`${_url}/consolidatedReport`, {params: {begin, end}});
    },
    post({
        cashFlowType, 
        datetime, 
        description, 
        value
    }) {
        return api.post(_url, {
                cashFlowType, 
                datetime, 
                description, 
                value
            });
    },
    delete(id) {
        return api.delete(`${_url}/${id}`);
    }
};

export default cashFlowService;
