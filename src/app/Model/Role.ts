import {Referency} from './Referency';
import {Permission} from './Permission';
export class Role extends Referency{
    public Permissions: Permission[];
    constructor(
        public Id: number,
        public Name: string
    ) {
	super();
    this.Permissions= [];
	}
}