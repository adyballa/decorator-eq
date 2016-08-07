import {IEq, IEqConfig} from './eq.interface';

export class EqOr {

    static fuzzyEq(cs:IEq[], refs:IEq[], config:IEqConfig):IEq[] {
        return cs.filter((a:IEq) => {
            return (refs.filter((ref:IEq) => {
                return (ref.eq(a, config) !== false);
            }).length > 0);
        });
    }

    static eq(cs:IEq[], refs:IEq[], config:IEqConfig):IEq[] {
        return cs.filter((a:IEq) => {
            return (refs.filter((ref:IEq) => {
                return (ref.eq(a, config) === true);
            }).length > 0);
        });
    }

}