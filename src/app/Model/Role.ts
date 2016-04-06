import {Referency} from './Referency'
export class Role extends Referency{
    constructor(
        public Id: number,
        public Name: string
    ) {
	super();
	}
}