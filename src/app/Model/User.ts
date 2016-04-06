import {Referency} from './Referency'
import {Role} from './Role';
export class User extends Referency{
	Roles: Role[];
    constructor(
        public Id: number,
        public Name: string
    ) {
		super();
		this.Roles=[];
	}
}