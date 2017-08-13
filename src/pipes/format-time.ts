import { Pipe } from '@angular/core';

@Pipe({
  name: 'formatTime'
})

export class FormatTime {

  transform(value, args) {
    if (value === null || value === undefined || value === "") return "";
    var date = new Date(value);
    var am_pm = "AM";
    var h = date.getHours();
    if (h >= 12) {
      if (h == 12) {
        ;
      } else {
        h = h - 12;
      }
      am_pm = "PM";
    }
    var m = date.getMinutes();
    var s = date.getSeconds();
    // add a zero in front of numbers<10
    m = this.checkTime(m);
    s = this.checkTime(s);
    //return h + ":" + m + ":" + s + " " + am_pm;
    return h + ":" + m + " " + am_pm;

  }

  checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
}
