import { Referency } from './Referency';

export class Section extends Referency {
    constructor(
        public Id: number,
        public Name: string
    ) {
        super();
    }
}
