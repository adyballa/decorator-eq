import { IEq, IEqConfig, IField, IEqProps, IFieldProperty } from "./eq.interface";
import { EqField } from "./eq.config";
export declare class FuzzyEqField extends EqField {
    eq(a: IEq, b: IEq): boolean;
}
export declare class Eq {
    protected static _eq: {
        fields: Array<EqField>;
    };
    protected static _impl(method: string): (a: any, config?: IEqConfig) => boolean;
    static implementFields(config?: IEqConfig, fields?: Array<IField>): void;
    static field(props: IFieldProperty): (target: Object, propertyKey: string) => void;
    static implement(props?: IEqProps): (target: Function) => void;
    static eq(cs: IEq[], ref: IEq, config: IEqConfig): IEq[];
    static fuzzyEq(cs: IEq[], ref: IEq, config: IEqConfig): IEq[];
    static neq(cs: IEq[], ref: IEq, config: IEqConfig): IEq[];
}
