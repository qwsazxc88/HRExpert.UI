import {Pipe, PipeTransform} from 'angular2/core';
import {Referency} from '../Model/Referency'

@Pipe({
  name: 'arrayFilter'
})

export class ArrayFilterPipe implements PipeTransform {
  transform(value: Referency[], args: any[]) {
    var newArray: Referency[] = [];
	var filterArray:Referency[] = args[0];
    for(var el in value)
	{
		if(!filterArray.find(x=>x.Id==el.Id)) newArray.push(el);
	}
    return newArray;
  }
}
