import {BaseEntity, getRepository} from "typeorm";

export class BaseController<T> {
    /**
     *
     */
    constructor() {
    }

    T: typeof BaseEntity;

    _repository = getRepository(this.T);
}

