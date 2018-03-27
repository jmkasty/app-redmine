import { BaseEntity } from './../../shared';

export class Track implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public time?: any,
        public description?: string,
        public userRedmine?: BaseEntity,
    ) {
    }
}
