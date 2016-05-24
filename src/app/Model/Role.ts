import {Referency} from './Referency';
import {Permission} from './Permission';
import {Section} from './Section';
export class Role extends Referency{
    public Sections : Section[];
    public Permissions: Permission[];
    constructor(
        public Id: number,
        public Name: string
    ) {
	super();
    this.Permissions= [];
    this.Sections = [];
	}
}