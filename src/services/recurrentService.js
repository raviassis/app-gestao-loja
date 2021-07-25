import api from './api';

const _url = '/recurrents';
const cashFlowService = {
    get({limit, offset}) {
        return api.get(_url, { params: {limit, offset}});
    },
    post({
        cashFlowType,
        description, 
        value,
        day
    }) {
        return api.post(_url, {
                cashFlowType,
                description, 
                value,
                day
            });
    },
    delete(id) {
        return api.delete(`${_url}/${id}`);
    }
};

export default cashFlowService;
