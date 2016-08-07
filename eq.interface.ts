export interface IEq {
    [name:string]:any;
    eq(a:IEq):boolean,
    eq(a:IEq, config:IEqConfig):boolean;
    neq(a:IEq):boolean
    neq(a:IEq, config:IEqConfig):boolean;
}

export interface IFieldProperty {
    fuzzy?:boolean
}

export interface IEqProps {
    config?:IEqConfig;
}

export type TFieldValue = number | string | IEq;

export function isEq(object:any):object is IEq {
    return (typeof object === 'object' && 'eq' in object && 'neq' in object);
}

export interface IEqConfig {
    fields:Array<IField>,
    clone:()=>IEqConfig
}

export interface IField {
    name:string;
    eq:(a:IEq, b:IEq)=>boolean;
    neq:(a:IEq, b:IEq)=>boolean;
    value:(object:IEq)=>TFieldValue;
    clone:()=>IField;
}
