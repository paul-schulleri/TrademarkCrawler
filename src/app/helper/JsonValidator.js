module.exports = class JsonValidator {
    constructor(trueFunction, falseFunction) {
        this.trueFunction = trueFunction;
        this.falseFunction = falseFunction;
    }

    validate(value){
        try {
            JSON.parse(value);
            this.trueFunction();
        } catch (e) {
            this.falseFunction();
        }
    }
};