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
  }
  getCurrentTimer() {
    return this.currentTimer;
  }
  stopTimer() {
    console.log("StopTime: n/a");
    clearInterval(this.internalTimer);
    clearTimeout(this.internalTimerout);
  }
  resetTimer() {
    console.log("ResetTime: " + this.internalTimer);
    clearInterval(this.internalTimer);
    clearTimeout(this.internalTimerout);
    this.time = 0;
    this.currentTimer = 0
    this.timerInterval = 0;
  }
  setTimer(_time) {
    this.time = _time;
    console.log("SetTimer:" + _time);
  }
  setTimerInterval(_timerInterval) {
    this.timerInterval = _timerInterval;
    console.log("SetTimerInterval:" + _timerInterval);
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
  setCallbackTimerInterval(_callbackTimerInterval = () => { console.log("NO EXTERNAL INTERVAL MESSAGE") }) {
    this.callbackTimerInterval = () => {
      this.currentTimer += this.timerInterval;

      console.log("|External callbackTimerInterval:");
      _callbackTimerInterval()

      console.log("|Internal callbackTimerInterval CurretTime: " + this.currentTimer + " - InternalTimer: " + this.internalTimer);
      console.log("-----------------------------");
    }

  }

  startTimer() {
    this.internalTimer = setInterval(this.callbackTimerInterval, this.timerInterval)
    this.internalTimerout = setTimeout(this.callbackTimerout, this.time - this.currentTimer);
  }
}
const myTimer = new Timer();
myTimer.setTimer(3000);
myTimer.setTimerInterval(1000);
myTimer.setCallbackTimerout(()=>{
  console.log("FIM - CallbackTimeOut")
})
myTimer.setCallbackTimerInterval(() => {
  document.getElementById("add").innerText = myTimer.getCurrentTimer();
  console.log(myTimer.getCurrentTimer());
})
myTimer.startTimer()

