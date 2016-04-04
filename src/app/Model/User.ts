import {Role} from './Role';
export class User{
	Roles: Role[];
    constructor(
        public Id: number,
        public Name: string
    ) {
		this.Roles=[];
	}
}