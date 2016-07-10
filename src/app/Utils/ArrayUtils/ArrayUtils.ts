//class ArrayUtils {
export function RemoveFromArray(arr, entry) {
    var index = arr.indexOf(entry, 0);
    if (index > -1) {
        arr.splice(index, 1);
    }
}
//}
