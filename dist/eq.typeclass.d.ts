export interface IEq {
    [name: string]: any;
    eq(a: IEq): boolean;
    eq(a: IEq, config: IEqConfig): boolean;
    neq(a: IEq): boolean;
    neq(a: IEq, config: IEqConfig): boolean;
}
export declare type TFieldValue = number | string | IEq;
export interface IFieldProperty {
    fuzzy?: boolean;
}
export declare function isEq(object: any): object is IEq;
export interface IField {
    name: string;
    eq: (a: IEq, b: IEq) => boolean;
    neq: (a: IEq, b: IEq) => boolean;
    value: (object: IEq) => TFieldValue;
}
export declare class EqField implements IField {
    name: string;
    constructor(name: string);
    eq(a: IEq, b: IEq): boolean;
    neq(a: IEq, b: IEq): boolean;
    value(object: IEq): TFieldValue;
}
export declare class FuzzyEqField extends EqField {
    eq(a: IEq, b: IEq): boolean;
}
export interface IEqConfig {
    fields: Array<IField>;
}
export declare class EqConfig implements IEqConfig {
    protected _fields: Array<IField>;
    fields: Array<IField>;
    static setCardinalityOfField(name: string, fields: Array<IField>, newIndex?: number): void;
}
export interface IEqProps {
    config?: IEqConfig;
}
export declare class Eq {
    protected static _eq: {
        fields: Array<EqField>;
    };
    protected static _impl(method: string): (a: any, config?: IEqConfig) => boolean;
    static implementFields(config?: IEqConfig, fields?: Array<EqField>): void;
    static field(props: IFieldProperty): (target: Object, propertyKey: string) => void;
    static implement(props?: IEqProps): (target: Function) => void;
    static eq(cs: IEq[], ref: IEq, config: IEqConfig): IEq[];
    static fuzzyEq(cs: IEq[], ref: IEq, config: IEqConfig): IEq[];
    static neq(cs: IEq[], ref: IEq, config: IEqConfig): IEq[];
}
export declare class EqOr {
    static fuzzyEq(cs: IEq[], refs: IEq[], config: IEqConfig): IEq[];
}
