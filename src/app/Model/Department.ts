import {Referency} from './Referency';
export class Department extends Referency{
    public OrganizationId :number;
    constructor(
        public Id: number,
        public Name: string
    ) {
	super();
	}
}