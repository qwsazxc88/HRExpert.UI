import {Pipe, PipeTransform} from 'angular2/core';
import {Referency} from '../Model/Referency'

@Pipe({
  name: 'arrayFilter'
})

export class ArrayFilterPipe implements PipeTransform {
  transform(value: Referency[], args: any[]) {
    var newArray: Referency[] = [];
	var filterArray:Referency[] = args[0];
    console.log('entering filter');
    for(var i=0;i<value.length;i++)
	{
        var adding:boolean = true;
		for(var n=0;n<filterArray.length;n++)
        {
            if(filterArray[n].Id==value[i].Id)
            {
                adding=false;
            }
        }
        if(adding)
            newArray.push(value[i]);
	}
    return newArray;
  }
}
