import {IEq, isEq, IField, IEqConfig, TFieldValue, IFieldProperty} from "./eq.interface";

export class EqField implements IField {

    constructor(public name:string) {
    }

    public eq(a:IEq, b:IEq):boolean {
        let vals = [this.value(a), this.value(b)];
        return (vals[0] === null || vals[1] === null) ? null :
            (isEq(vals[0])) ? (<IEq> vals[0]).eq(<IEq> vals[1]) : (vals[0] === vals[1]);
    }

    public neq(a:IEq, b:IEq):boolean {
        let val = this.eq(a, b);
        return (val === null) ? null : !val;
    }

    public value(object:IEq):TFieldValue {
        return object[this.name];
    }

    public clone():EqField{
        return new EqField(this.name);
    }
}

export class FuzzyEqField extends EqField {

    public eq(a:IEq, b:IEq):boolean {
        let vals = [this.value(a), this.value(b)];
        if (vals[0] === null || vals[1] === null) {
            return null;
        } else {
            if (isEq(vals[0])) {
                return (<IEq> vals[0]).eq(<IEq> vals[1])
            } else {
                if (vals[0] === vals[1]) {
                    return true;
                } else {
                    return ((typeof vals[0] === "string") && ((<string> vals[1]).indexOf(<string> vals[0]) > -1)) ? null : false;
                }
            }
        }
    }

    public clone():EqField{
        return new FuzzyEqField(this.name);
    }
}

export class EqConfig implements IEqConfig {

    protected _fields:Array<IField> = [];

    public get fields():Array<IField> {
        return this._fields;
    }

    public set fields(fields:Array<IField>) {
        this._fields = fields;
    }

    public clone():EqConfig{
        const res = new EqConfig();
        let f : Array<IField> = [];
        this._fields.forEach((field:IField) =>{
            f.push(field.clone());
        });
        res.fields=f;
        return res;
    }
}
