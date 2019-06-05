import { TypeHelp } from "./type-help";

export class TextHelp {

    static fixLength(input, fixedLength: number): string {
        if (!TypeHelp.isString(input)) {
            input = input.toString();
        }
        if (input.length >= fixedLength) {
            return input.substr(0, fixedLength - 3) + "...";
        }
        return input + " ".repeat(fixedLength - input.length);
    }
    
    static fixLengthNumber(input: number, fixedLength: number): string {
        if (input.toString().length >= fixedLength) {
            return input.toString();
        }
        let fixLengthNumber = (("0".repeat(fixedLength) + input).slice(-1 * fixedLength));
        return fixLengthNumber;
    }

}