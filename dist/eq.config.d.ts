import { IEq, IField, IEqConfig, TFieldValue } from "./eq.interface";
export declare class EqField implements IField {
    name: string;
    constructor(name: string);
    eq(a: IEq, b: IEq): boolean;
    neq(a: IEq, b: IEq): boolean;
    value(object: IEq): TFieldValue;
    clone(): EqField;
}
export declare class EqConfig implements IEqConfig {
    protected _fields: Array<IField>;
    fields: Array<IField>;
    clone(): IEqConfig;
}
