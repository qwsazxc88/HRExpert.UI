import { Person } from './Person';
import {FileDto} from './FileDto';
import {DocumentApprovement} from './DocumentApprovement'

export class $Document<T> {
    CreateDate: Date;
    Creator: Person;
    Person: Person;
    Data: T;
    Files: FileDto[];
    Approvements: DocumentApprovement[];
}
