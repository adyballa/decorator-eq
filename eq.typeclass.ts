import {IEq, IEqConfig, IField, IEqProps, IFieldProperty} from "./eq.interface";
import {EqField, FuzzyEqField} from "./eq.config";

export class Eq {

    protected static _eq:{fields:Array<EqField>} = {fields: []};

    protected static _impl(method:string) {
        return function (a:any, config?:IEqConfig) {
            let res:boolean = null;
            if (!config) {
                throw new Error("Method " + method + " cannot be run without config.");
            }
            for (let field of config.fields) {
                let val:boolean = (method === "eq") ? field.eq(this, a) : field.neq(this, a);
                if (val !== null) {
                    if (!val) return false;
                    res = true;
                }
            }
            return res;
        }
    }

    static implementFields(config?:IEqConfig, fields:Array<IField> = []) {
        let _f:Array<IField> = [];
        for (let i = 0, j = fields.length; i < j; i++) {
            if (fields[i] !== undefined) {
                _f.push(fields[i]);
            }
        }
        if (config) {
            config.fields = config.fields.concat(_f);
        }
    }

    static field(props:IFieldProperty) {
        return function (target:Object, propertyKey:string) {
            Eq._eq.fields.push(("fuzzy" in props && props.fuzzy) ? new FuzzyEqField(propertyKey) : new EqField(propertyKey));
        }
    }

    static implement(props?:IEqProps) {
        return (target:Function) => {
            Eq.implementFields((props) ? props.config : null, Eq._eq.fields);
            Eq._eq.fields = [];
            target.prototype.eq = this._impl("eq");
            target.prototype.neq = this._impl("neq");
        }
    }

    static eq(cs:IEq[], ref:IEq, config:IEqConfig):IEq[] {
        return cs.filter((a:IEq) => {
            return ref.eq(a, config);
        });
    }

    static fuzzyEq(cs:IEq[], ref:IEq, config:IEqConfig):IEq[] {
        return cs.filter((a:IEq) => {
            return (ref.eq(a, config) !== false);
        });
    }

    static neq(cs:IEq[], ref:IEq, config:IEqConfig):IEq[] {
        return cs.filter((a:IEq) => {
            return (ref.eq(a, config) === false);
        });
    }
}
