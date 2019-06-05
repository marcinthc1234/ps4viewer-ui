import { TextHelp } from "./text-help";

export class DateHelp {

  static formatDate(date: Date): string {
    let formattedDate = 
      TextHelp.fixLengthNumber(date.getDate(), 2) + "-" + 
      TextHelp.fixLengthNumber(date.getMonth() + 1, 2) + "-" + 
      TextHelp.fixLengthNumber(date.getFullYear(), 4) + " " + 
      TextHelp.fixLengthNumber(date.getHours(), 2) + ":" + 
      TextHelp.fixLengthNumber(date.getMinutes(), 2) + ":" + 
      TextHelp.fixLengthNumber(date.getSeconds(), 2)
    return formattedDate;
  }

  static formatTime(time: number): string {
    return this.formatDate(new Date(time * 1000));
  }

}
