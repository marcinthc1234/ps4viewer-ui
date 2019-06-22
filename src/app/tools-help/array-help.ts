export class ArrayHelp {

    static isEmpty(array): boolean {
        return (!Array.isArray(array) || !array.length);
    }

}