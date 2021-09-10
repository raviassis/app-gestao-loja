export default class TypeRegisterDescriptionEnum {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static get FREE_DESCRIPTIONS() {return new TypeRegisterDescriptionEnum(1, "FREE_DESCRIPTIONS"); }
    static get DEFINED_DESCRIPTIONS() {return new TypeRegisterDescriptionEnum(2, "DEFINED_DESCRIPTIONS"); }
    static getById(id) {
        switch(id) {
            case this.FREE_DESCRIPTIONS.id:
                return this.FREE_DESCRIPTIONS;
            case this.DEFINED_DESCRIPTIONS.id:
                return this.DEFINED_DESCRIPTIONS;
            default:
                throw new Error(`Not exist CashFlowTypeEnum to id : ${id}`);
        }
    }
}