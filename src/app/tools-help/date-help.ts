export class DateHelp {

  static formatDate(date: Date): string {
    let formattedDate = 
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " " + 
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    return formattedDate;
  }

  static formatTime(time: number): string {
    return this.formatDate(new Date(time));
  }

}
