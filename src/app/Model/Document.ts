import { Person } from './Person';
import { FileDto } from './FileDto';
import { DocumentApprovement } from './DocumentApprovement'

export class $Document<T> {
    createDate: Date;
    creator: Person;
    person: Person;
    data: T;
    files: FileDto[];
    approvements: DocumentApprovement[];
}
