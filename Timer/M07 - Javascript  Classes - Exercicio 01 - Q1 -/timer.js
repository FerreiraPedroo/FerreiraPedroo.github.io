class Timer {
  constructor(_time = 0, _timerInterval = 100, _callbackTimeout = () => { console.log("NO TIMEOUT MESSAGE") }, _callbackTimerInterval = () => { console.log("NO INTERVAL MESSAGE") }) {
    this.time = _time;
    this.currentTimer = 0;
    this.timerInterval = _timerInterval;
    this.callbackTimerout = _callbackTimeout;
    this.callbackTimerInterval = _callbackTimerInterval;
    this.internalTimer;
    this.internalTimerout;
    console.log(this)
/*
    this.buttonStart;
    this.buttonStop;
    this.buttonReset;
*/
  }

  setTimer(_time) {
    this.time = _time;
    console.log("SetTimer:" + _time);
  }
  setTimerInterval(_timerInterval) {
    this.timerInterval = _timerInterval;
    console.log("SetTimerInterval:" + _timerInterval);
  }
  getCurrentTimer() {
    return this.currentTimer;
  }
  stopTimer() {
/*
    this.buttonStop.disabled = true;
    this.buttonReset.disabled = false;
    this.buttonStart.disabled = false;
*/

    clearInterval(this.internalTimer);
    clearTimeout(this.internalTimerout);
  }
  resetTimer() {
/*
    this.buttonStop.disabled = true;
    this.buttonReset.disabled = true;
    this.buttonStart.disabled = false;
*/
    clearInterval(this.internalTimer);
    this.internalTimer = 0;
    clearTimeout(this.internalTimerout);
    console.log(this.internalTimerout)
    this.internalTimerout = 0;
    console.log(this.internalTimerout)

    this.time = 0;
    this.currentTimer = 0;
    this.timerInterval = 0;

  }


  setCallbackTimerout(_callbackTimerout = () => { console.log("NO EXTERNAL TIMEOUT MESSAGE") }) {
    this.callbackTimerout = () => {

      console.log("External callbackTimerout:");
      _callbackTimerout();

      console.log("Internal callbackTimerout: TIMER OUT");
      this.time = 0;
      this.currentTimer = 0;
      clearTimeout(this.internalTimerout);
      clearInterval(this.internalTimer);

    }
  }
  setCallbackTimerInterval(_callbackTimerInterval = () => {/* console.log("NO EXTERNAL INTERVAL MESSAGE: "+ this.internalTimer) */ }) {
    this.callbackTimerInterval = () => {

      //ALTERAÇÃO DO currentTimer
      let alterarTimeSEGUNDOS = 0;
      let alterarTimeMINUTO = 0;
      let alterarTimeHORA = 0;
      let timerALTERADO = (alterarTimeSEGUNDOS != 0 ? 1000 * alterarTimeSEGUNDOS : 0) + (alterarTimeMINUTO != 0 ? 60000 * alterarTimeMINUTO : 0) + (alterarTimeHORA != 0 ? 3600000 * alterarTimeHORA : 0);
      this.currentTimer += this.timerInterval + timerALTERADO;
      //this.currentTimer += this.timerInterval; // CURRENT TIME NORMAL
      console.log("TimerALTERADO: " + timerALTERADO)
      console.log(myTimer)


      _callbackTimerInterval()

    }
  }
  startTimer(_buttonElement) {
    /*
    if (this.buttonStart == undefined) {
      this.buttonStart = _buttonElement;
      this.buttonStop = this.buttonStart.querySelector("#button-stop")
      this.buttonStop.disabled = false;
      this.buttonReset = this.buttonStart.querySelector("#button-reset");
      this.buttonReset.disabled = false;
      this.buttonStart = this.buttonStart.querySelector("#button-start");
      this.buttonStart.disabled = true;
    } else {
      this.buttonStop.disabled = false;
      this.buttonReset.disabled = false;
      this.buttonStart.disabled = true;
    }
*/
    this.internalTimer = setInterval(this.callbackTimerInterval, this.timerInterval)
    this.internalTimerout = setTimeout(this.callbackTimerout, this.time - this.currentTimer);
    console.log("START: " + this.time + " - " + this.currentTimer);
  }
  currentTimeString() {
    //     0.001 - 1 milésimo de segundo
    //     0.010 - 1 centésimo de segundo
    //     0.100 - 1 décimo de segundo
    //     1.000 - 1 segundo
    //    60.000 - 1 minuto
    // 3.600.000 - 1 hora
    //36.000.000 - 10 horas
    let hourTime;
    if (this.currentTimer >= 3600000 && this.currentTimer < 36000000) {
      hourTime = `0${parseInt(this.currentTimer / 3600000)}`;
    } else if (this.currentTimer > 36000000) {
      hourTime = `${parseInt(this.currentTimer / 3600000)}`;
    } else if (this.currentTimer < 3600000) {
      hourTime = "00";
    }
    let minuteTime;
    if (parseInt((this.currentTimer - (3600000 * hourTime)) / 60000) < 10) {
      minuteTime = `0${parseInt((this.currentTimer - (3600000 * hourTime)) / 60000)}`;
    } else if (parseInt((this.currentTimer - (3600000 * hourTime)) / 60000) >= 10) {
      minuteTime = `${parseInt((this.currentTimer - (3600000 * hourTime)) / 60000)}`;
    } else if (this.currentTimer < 60000) {
      minuteTime = "00";
    }
    let secondTime;
    if (parseInt((this.currentTimer - (60000 * minuteTime + (3600000 * hourTime))) / 1000) < 10) {
      secondTime = `0${parseInt((this.currentTimer - (60000 * minuteTime + (3600000 * hourTime))) / 1000)}`;
    } else if (parseInt((this.currentTimer - (60000 * minuteTime + (3600000 * hourTime))) / 1000) >= 10) {
      secondTime = `${parseInt((this.currentTimer - (60000 * minuteTime + (3600000 * hourTime))) / 1000)}`;
    } else if (this.currentTimer < 1000) {
      secondTime = "00";
    }
    let decimalSecondTime;
    if (parseInt((this.currentTimer - ((1000 * secondTime) + (60000 * minuteTime) + (3600000 * hourTime))) / 10) < 10) {
      decimalSecondTime = `0${parseInt((this.currentTimer - ((1000 * secondTime) + (60000 * minuteTime) + (3600000 * hourTime))) / 10)}`;
    } else if (parseInt((this.currentTimer - ((1000 * secondTime) + (60000 * minuteTime) + (3600000 * hourTime))) / 10) >= 10) {
      decimalSecondTime = `${parseInt((this.currentTimer - ((1000 * secondTime) + (60000 * minuteTime) + (3600000 * hourTime))) / 10)}`;
    } else if (this.currentTimer < 10) {
      decimalSecondTime = "00";
    }


    console.log("TOTAL TIME: " + this.time);
    console.log("CURRENT TIME: " + this.currentTimer);
    console.log("HourTime: " + hourTime);
    console.log("MinuteTime: " + minuteTime);
    console.log("SecondTime: " + secondTime);
    console.log("DecimalSecondTime: " + decimalSecondTime);
    console.log("--------------------------------------");


    return hourTime + ":" + minuteTime + ":" + secondTime + " " + decimalSecondTime;
  }
}

const myTimer = new Timer();
function startTimerFunction(_buttonsHTML) {
console.log(myTimer.getCurrentTimer())
  if (myTimer.getCurrentTimer() == 0) {
    myTimer.setTimer(3600000);
    myTimer.setTimerInterval(100);
    myTimer.setCallbackTimerout(() => {
      console.log("FIM - CallbackTimeOut")
    })
    myTimer.setCallbackTimerInterval(() =>{
      document.getElementById("div-timer").innerHTML = myTimer.currentTimeString() ;
    })
    myTimer.startTimer(_buttonsHTML)
  } else {
    myTimer.startTimer()
  }
}
function resetTimerFunction(){
  myTimer.resetTimer()
  document.getElementById("div-timer").innerHTML = "00:00:00 00"

}