import { IEq, IEqConfig } from './eq.interface';
export declare class EqOr {
    static fuzzyEq(cs: IEq[], refs: IEq[], config: IEqConfig): IEq[];
    static eq(cs: IEq[], refs: IEq[], config: IEqConfig): IEq[];
}
