import {Pipe, PipeTransform} from 'angular2/core';
import {Referency} from '../Model/Referency'

@Pipe({
  name: 'idFilter',
  pure: false
})

export class IdFilterPipe implements PipeTransform {
  transform(value: any[], args: any[]) {
    var newArray: any[] = [];
	var id:number = args[0];
    var subarrayname: string = args[1];
    
    if (!value) return value;
    if (!id) return value;
    console.log(id);
    console.log(subarrayname);
    if(subarrayname)
    {
        newArray = value.filter(x=>x[subarrayname].Id==id);
    }
    else
    {
        newArray = value.filter(x=>x.Id==id);
    }
    return newArray;
  }
}
