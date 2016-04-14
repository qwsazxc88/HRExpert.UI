import {Referency} from './Referency'
import {Section} from './Section'
export class Permission extends Referency{
    public Section : Section;
    constructor(
        public Id: number,
        public Name: string
    ) {    
	super();
    this.Section = new Section(0,'');
	}
}