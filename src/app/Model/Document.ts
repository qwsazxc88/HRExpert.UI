import { Person } from './Person';
import { FileDto } from './FileDto';
import { DocumentApprovement } from './DocumentApprovement'

export interface $Document<T> {
    createDate: Date;
    creator: Person;
    person: Person;
    data: T;
    files: FileDto[];
    approvements: DocumentApprovement[];
}
