import { Pipe, PipeTransform } from '@angular/core';
import { Referency } from '../../Model';

@Pipe({
    name: 'arrayFilter',
    pure: false
})

export class ArrayFilterPipe implements PipeTransform {
    transform(value: Referency[], args: any[]) {
        var newArray: Referency[] = [];
        var filterArray: Referency[] = args[0];
        if (!value) return value;
        if (!filterArray) return value;
        for (var i = 0; i < value.length; i++) {
            var adding: boolean = true;

            for (var n = 0; n < filterArray.length; n++) {
                if (filterArray[n].Id == value[i].Id) {
                    adding = false;
                }
            }
            if (adding)
                newArray.push(value[i]);
        }
        return newArray;
    }
}
