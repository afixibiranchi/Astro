import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Platform } from 'ionic-angular';
import { DataHolderProvider } from './../../providers/DataHolderProvider';

@Component({
  selector: 'page-tv-guide',
  templateUrl: 'tv-guide.html',
})

export class TvGuidePage {

  loader: any;
  channelsArr = [];
  eventsArr = [];

  todaysDate: any;
  myDate: any;
  minDate: any;
  maxDate: any;

  selectedChannel: any;
  currentRunningIndexList = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public dataHolder: DataHolderProvider, public loadingCtrl: LoadingController,
    public alerCtrl: AlertController, public platform: Platform) {

    this.channelsArr = this.navParams.get("channelsArr");
    if (this.channelsArr && this.channelsArr.length) {
      this.channelsArr.sort((a, b) => {
        if (a.channelTitle.toLowerCase() < b.channelTitle.toLowerCase()) return -1;
        if (a.channelTitle.toLowerCase() > b.channelTitle.toLowerCase()) return 1;
        return 0;
      });
    }

    //console.log("channelsArr : ", JSON.stringify(this.channelsArr));

  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad TvGuidePage');


    //--------------- Date Start -----------------------

    var currentDate = new Date();
    console.log("currentDate 11 : ", currentDate);
    if (this.platform.is('ios')) {
      //currentDate.setTime(currentDate.getTime() + currentDate.getTimezoneOffset() * 60 * 1000);
    }

    var todaysDayStr = currentDate.getFullYear() + "-" + (((currentDate.getMonth() + 1) < 10) ? ("0" + (currentDate.getMonth() + 1)) : (currentDate.getMonth() + 1)) + "-" + ((currentDate.getDate() < 10) ? ("0" + currentDate.getDate()) : currentDate.getDate());
    console.log("todaysDayStr : ", todaysDayStr);


    this.todaysDate = todaysDayStr;
    //console.log("todaysDate 11 : ", this.todaysDate);

    this.myDate = this.todaysDate;
    this.minDate = currentDate.getFullYear();

    var lastDay = new Date();
    if (this.platform.is('ios')) {
      //lastDay.setTime(lastDay.getTime() + lastDay.getTimezoneOffset() * 60 * 1000 + (7 * 24 * 60 * 60 * 1000));
    }
    lastDay.setTime(lastDay.getTime() + (7 * 24 * 60 * 60 * 1000));
    var lastDayStr = lastDay.getFullYear() + "-" + (((lastDay.getMonth() + 1) < 10) ? ("0" + (lastDay.getMonth() + 1)) : (lastDay.getMonth() + 1)) + "-" + ((lastDay.getDate() < 10) ? ("0" + lastDay.getDate()) : lastDay.getDate());
    console.log("lastDayStr : ", lastDayStr);

    this.maxDate = lastDayStr;



    console.log("todaysDate : ", this.todaysDate);
    console.log("minDate : ", this.minDate);
    console.log("maxDate : ", this.maxDate);

    //--------------- Date End -----------------------


    //-------- Select Channel -------------
    this.selectedChannel = "Select";
  }


  ionViewDidEnter() {
    console.log("ChannelsArr length : ", this.channelsArr.length);
  }




  //------------- Show Guide Start ---------------

  showGuide() {
    console.log("myDate : ", this.myDate);
    console.log("selectedChannel : ", JSON.stringify(this.selectedChannel));

    this.getEventsFromDataHolder();

  }

  //------------- Show Guide End ---------------




  //------------- Get Events from DataHolder Start ---------------

  getEventsFromDataHolder() {

    var self = this;
    this.presentLoading();

    if (this.selectedChannel == "Select") {
      this.selectedChannel = [];
      var firstChannelId = this.channelsArr[0]["channelId"];
      this.selectedChannel.push(firstChannelId);
    }

    var channelIds = this.selectedChannel.join(",")


    //var params = "channelId=[3]&periodStart=2017-08-14 00:00&periodEnd=2017-08-14 23:59";
    var params = "channelId=[" + channelIds + "]&periodStart=" + this.myDate + " 00:00&periodEnd=" + this.myDate + " 23:59";

    console.log("params : ", params);



    this.dataHolder.getEvents(params, function (result, data) {
      self.loader.dismiss();

      console.log("Events result : ", result);

      if (result == "success") {
        self.eventsArr = data["getevent"];
        self.eventsArr.sort((a, b) => {
          if (a.displayDateTime < b.displayDateTime) return -1;
          if (a.displayDateTime > b.displayDateTime) return 1;
          return 0;
        });


        self.calculateCurrentRunningProgram();

      }

      //console.log("Events response : ", JSON.stringify(self.eventsArr));

    });
  }

  //------------- Get Events from DataHolder End ---------------



  calculateCurrentRunningProgram() {



    var timeOut = setTimeout(() => {

      this.currentRunningIndexList = [];

      //---------- Current time start -----------

      var currentDateTime = new Date();
      //currentDateTime.setTime(currentDateTime.getTime() + currentDateTime.getTimezoneOffset() * 60 * 1000);

      for (var i = 0; i < this.eventsArr.length; i++) {
        var channelItem = this.eventsArr[i];
        var startTimeStr = channelItem.displayDateTime;
        var durationStr = channelItem.displayDuration;

        // if (this.platform.is('android')) {
        //   startTimeStr = channelItem.displayDateTimeUtc
        // }

        startTimeStr = startTimeStr.replace(" ", "T");

        // console.log("=======================");


        var durationStrComponents = durationStr.split(":");

        var startTime = new Date(startTimeStr);
        if (this.platform.is('ios')) {
          startTime.setTime(startTime.getTime() + startTime.getTimezoneOffset() * 60 * 1000);
        }

        var duration = new Date();
        duration.setHours(durationStrComponents[0]);
        duration.setMinutes(durationStrComponents[1]);

        // console.log("StartTime : ", startTime);
        // console.log("Duration : ", duration);

        var addMinutes = (60 * parseInt(durationStrComponents[0], 10)) + parseInt(durationStrComponents[1], 10);
        //console.log("Add minutes : ", addMinutes);

        var endTime = new Date(startTime);
        //endTime.setTime(endTime.getTime() + endTime.getTimezoneOffset() * 60 * 1000);
        endTime.setMinutes(endTime.getMinutes() + addMinutes);
        // console.log("endTime  : ", endTime);



        console.log("startTime : ", startTime);
        console.log("currentDateTime : ", currentDateTime);
        console.log("endTime : ", endTime);
        console.log("Program duration : ", channelItem.displayDuration);
        console.log("Current running channel : ", channelItem.programmeTitle);

        if ((startTime.getTime() <= currentDateTime.getTime()) && (currentDateTime.getTime() <= endTime.getTime())) {

          // console.log("startTime : ", startTime);
          // console.log("currentDateTime : ", currentDateTime);
          // console.log("endTime : ", endTime);
          // console.log("Program duration : ", channelItem.displayDuration);
          // console.log("Current running channel : ", channelItem.programmeTitle);

          this.currentRunningIndexList.push(i);
          clearTimeout(timeOut);
        }

      }

      //---------- Current time end -------------
    }, 1000);


  }




  refreshEvents() {
    console.log("Refresh contents");

    //-------- Select Channel -------------
    //this.selectedChannel = "Select";

  }



  //==================== Loader Start ===================================


  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading...",
    });
    this.loader.present();
  }

  //==================== Loader End ===================================





  //======================= Show Alert Start ================================

  showAlert(alertTitle = '', alertMessage = 'Missing Data') {
    let alert = this.alerCtrl.create({
      title: alertTitle,
      message: alertMessage,
      buttons: ['OK']
    });
    alert.present()
  }

  //======================= Show Alert End ================================


}
