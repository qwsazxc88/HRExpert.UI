import { Referency } from './Referency';
export class Organization extends Referency {

    constructor(
        public Id: number,
        public Name: string
    ) {
        super();
    }
}
