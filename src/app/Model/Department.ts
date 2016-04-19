import {Referency} from './Referency';
export class Department extends Referency{    
    public Childs:Array<Department>;
    constructor(
        public Id: number,
        public Name: string
    ) {
	super();
    this.Childs=[];
	}
}