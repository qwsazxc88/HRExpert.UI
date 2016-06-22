//class ArrayTools {
export function RemoveFromArray(mas, entry) {
    var index = mas.indexOf(entry, 0);
    if (index > -1) {
        mas.splice(index, 1);
    }
}
//}
