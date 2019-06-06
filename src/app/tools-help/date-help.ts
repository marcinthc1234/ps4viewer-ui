import { TextHelp } from "./text-help";

export class DateHelp {

  static formatDate(date: Date, includeTime: boolean = false): string {
    let formattedDate = 
      TextHelp.fixLengthNumber(date.getDate(), 2) + "-" + 
      TextHelp.fixLengthNumber(date.getMonth() + 1, 2) + "-" + 
      TextHelp.fixLengthNumber(date.getFullYear(), 4);
      
    if (includeTime) {
      formattedDate += " " + 
      TextHelp.fixLengthNumber(date.getHours(), 2) + ":" + 
      TextHelp.fixLengthNumber(date.getMinutes(), 2) + ":" + 
      TextHelp.fixLengthNumber(date.getSeconds(), 2);
    }
    return formattedDate;
  }

  /**
   * Convert time given in seconds to a date/time format.
   * @param seconds 
   */
  static formatDateSeconds(seconds: number, includeTime: boolean = false): string {
    return this.formatDate(new Date(seconds * 1000));
  }

}
