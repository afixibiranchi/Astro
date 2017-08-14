import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DayMonthYear pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  //name: 'day-month-year',
  name: 'formatDate',
})

export class FormatDate implements PipeTransform {

  // transform(value: string, ...args) {
  //   return value.toLowerCase();
  // }

  transform(value: string, ...args) {

    // console.log("args : ", args["showDay"]);

    //console.log("format date :", value);

    if (value === null || value === undefined || value === "") return "";
    var date = new Date(value);

    //console.log("date 11 : ", date);


    if (date.toString() == "Invalid Date") {
      value = value.replace(" ", "T");

      //console.log("format date 22 :", value);

      date = new Date(value);
      date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    }

    //console.log("date.getTimezoneOffset() 111 : ", date.getTimezoneOffset());

    //console.log("date 22 : ", date);
    return this.formatDate(date);
  }


  formatDate(today) {
    var monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    //var weekdayNames = [
    //"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
    //];

    //return weekdayNames[today.getDay()] + ', ' + today.getDate() + ' '
    //+ monthNames[today.getMonth()] + ' ' + today.getFullYear();

    var result = today.getDate() + ' ' + monthNames[today.getMonth()] + ' ' + today.getFullYear();
    //console.log("result : ", result);

    return result;
  }

}
