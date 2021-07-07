export default class CashFlowTypeEnum {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    static get ALL() { return new CashFlowTypeEnum(0, "Todos"); }
    static get INCOMING() {return new CashFlowTypeEnum(1, "Entrada"); }
    static get OUTGOING() {return new CashFlowTypeEnum(2, "Saída"); }
    static getById(id) {
        switch(id) {
            case this.ALL.id:
                return this.ALL;
            case this.INCOMING.id:
                return this.INCOMING;
            case this.OUTGOING.id:
                return this.OUTGOING;
            default:
                throw new Error(`Not exist CashFlowTypeEnum to id : ${id}`);
        }
    }
}