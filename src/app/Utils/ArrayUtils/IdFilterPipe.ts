import { Pipe, PipeTransform } from '@angular/core';
// import { Referency } from '../../Model';

@Pipe({
  name: 'idFilter',
  pure: false
})

export class IdFilterPipe implements PipeTransform {
  transform(value: any[], args: any[]) {
    var newArray: any[] = [];
    var id: number = args[0];
    var subarrayname: string = args[1];

    if (!value) return value;
    if (!id) return value;
    console.log('IdFilterPipe id ' + id);
    console.log('IdFilterPipe subarr' + subarrayname);
    console.dir(value);
    console.dir(args);
    if (subarrayname) {
      newArray = value.filter(x => x[subarrayname].Id == id);
    } else {
      newArray = value.filter(x => x.Id == id);
    }
    return newArray;
  }
}
