import {Person} from './Person';
export class Document<T>
{
    CreateDate: Date;
    Creator: Person;
    Person: Person;
    Data: T;
}