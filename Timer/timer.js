class Timer {
  constructor(_time = 0, _timerInterval = 1000, _callbackTimeout = () => { console.log("[TIMER:TIMEROUT:NO-EXTERNAL-MESSAGE]") }, _callbackTimerInterval = () => { console.log("[TIMER:TIMERINTERVAL:NO-EXTERNAL-MESSAGE]") }) {
    this.time = _time;
    this.currentTimer = 0;
    this.timerInterval = _timerInterval;
    this.callbackTimerout = _callbackTimeout;
    this.callbackTimerInterval = _callbackTimerInterval;
    this.internalTimer;
    this.internalTimerout;
    //console.log(this)

  }
  setTimer(_time) {
    this.time = _time;
    console.log("SetTimer:" + _time);
    console.log(this)
  }
  setTimerInterval(_timerInterval) {
    this.timerInterval = _timerInterval;
    console.log("SetTimerInterval:" + _timerInterval);
  }
  getCurrentTimer() {
    return this.currentTimer;
  }
  stopTimer() {
    clearInterval(this.internalTimer);
    clearTimeout(this.internalTimerout);
  }
  resetTimer() {
    clearInterval(this.internalTimer);
    clearTimeout(this.internalTimerout);
    console.log(this.internalTimerout)
    this.internalTimer = 0;
    this.time = 0;
    this.currentTimer = 0;
    this.timerInterval = 0;

  }
  setCallbackTimerout(_callbackTimerout = () => { console.log("[TIMER:TIMEROUT:NO-EXTERNAL-MESSAGE]") }) {
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
  setCallbackTimerInterval(_callbackTimerInterval = () => { console.log("[TIMER:TIMEROUT:NO-EXTERNAL-MESSAGE]") }) {
    this.callbackTimerInterval = () => {
      //ALTERAÇÃO DO currentTimer
      let alterarTimeSEGUNDOS = 0;
      let alterarTimeMINUTO = 0;
      let alterarTimeHORA = 0;
      let timerALTERADO = (alterarTimeSEGUNDOS != 0 ? 1000 * alterarTimeSEGUNDOS : 0) + (alterarTimeMINUTO != 0 ? 60000 * alterarTimeMINUTO : 0) + (alterarTimeHORA != 0 ? 3600000 * alterarTimeHORA : 0);
      console.log("TimerALTERADO: " + timerALTERADO);

      this.currentTimer += this.timerInterval + timerALTERADO;
      //this.currentTimer += this.timerInterval; // CURRENT TIME NORMAL
      _callbackTimerInterval()
    }
  }
  startTimer(_buttonElement) {

    this.internalTimer = setInterval(this.callbackTimerInterval, this.timerInterval)
    this.internalTimerout = setTimeout(this.callbackTimerout, this.time - this.currentTimer);
    //console.log("START: " + this.time + " - " + this.currentTimer);
  }
  currentTimeString() {
    //     0.001 - 1 milésimo de segundo
    //     0.010 - 1 centésimo de segundo
    //     0.100 - 1 décimo de segundo
    //     1.000 - 1 segundo
    //    60.000 - 1 minuto
    // 3.600.000 - 1 hora
    //36.000.000 - 10 horas
    let time = this.time - this.currentTimer;

    let hourTime;
    if (time >= 3600000 && time < 36000000) {
      hourTime = `0${parseInt(time / 3600000)}`;
    } else if (time >= 36000000) {
      hourTime = `${parseInt(time / 3600000)}`;
    } else if (time < 3600000) {
      hourTime = "00";
    }

    let minuteTime;
    if (parseInt((time - (3600000 * hourTime)) / 60000) < 10) {
     minuteTime = `0${parseInt((time - (3600000 * hourTime)) / 60000)}`;
    } else if (parseInt((time - (3600000 * hourTime)) / 60000) >= 10) {
      minuteTime = `${parseInt((time - (3600000 * hourTime)) / 60000)}`;
    } else if (time < 60000) {
      minuteTime = "00";
    }

    let secondTime;
    if (parseInt((time - (60000 * minuteTime + (3600000 * hourTime))) / 1000) < 10) {
      secondTime = `0${parseInt((time - (60000 * minuteTime + (3600000 * hourTime))) / 1000)}`;
    } else if (parseInt((time - (60000 * minuteTime + (3600000 * hourTime))) / 1000) >= 10) {
      secondTime = `${parseInt((time - (60000 * minuteTime + (3600000 * hourTime))) / 1000)}`;
    } else if (time < 1000) {
      secondTime = "00";
    }

    let decimalSecondTime;
    if (parseInt((time - ((1000 * secondTime) + (60000 * minuteTime) + (3600000 * hourTime))) / 10) < 10) {
      decimalSecondTime = `0${parseInt((time - ((1000 * secondTime) + (60000 * minuteTime) + (3600000 * hourTime))) / 10)}`;

    } else if (parseInt((time - ((1000 * secondTime) + (60000 * minuteTime) + (3600000 * hourTime))) / 10) >= 10) {
      decimalSecondTime = `${parseInt((time - ((1000 * secondTime) + (60000 * minuteTime) + (3600000 * hourTime))) / 10)}`;

    } else if (time < 10) {
      decimalSecondTime = "00";
    }

    /*
    console.log("TOTAL TIME: " + this.time);
    console.log("CURRENT TIME: " + this.currentTimer);
    console.log("HourTime: " + hourTime);
    console.log("MinuteTime: " + minuteTime);
    console.log("SecondTime: " + secondTime);
    console.log("DecimalSecondTime: " + decimalSecondTime);
   */


    console.log(hourTime + ":" + minuteTime + ":" + secondTime + " " + decimalSecondTime);
    return hourTime + ":" + minuteTime + ":" + secondTime + " " + decimalSecondTime;
  }
}





















let timerArray = []
let timerHTML ="";
createTimer(10);
function createTimer(_countCreateTimer) {
  for (let t = 0; t < _countCreateTimer; t++) {
    timerArray[t] = new Timer()
  timerHTML += `  
  <div class="body">
  <div id="title">CHRONO TIMER ID:${t}</div>
  <div id="body-center">
      <p id="div-timer"><span id="timer-count-${t}">00:00:00 00</span>
      </p>
      <div id="center">
          <div>HH : MM : SS &nbsp; xx
              <div id="button-all-number">
                  <input type="number" id="button-change-hour-${t}" class="select-set-number" min="0" max="24"
                      id="hour" value="0" onclick="changeSetNumber(this.parentNode,${t})">
                  <span id="set-hour-number-${t}" class="set-number">00</span>
                  <input type="number" id="button-change-minute-${t}" class="select-set-number" min="0" max="60"
                      id="minute" value="0" onclick="changeSetNumber(this.parentNode,${t})">
                  <span id="set-minute-number-${t}" class="set-number">00</span>
                  <input type="number" id="button-change-second-${t}" class="select-set-number" min="0" max="60"
                      id="second" value="0" onclick="changeSetNumber(this.parentNode,${t})">
                  <span id="set-second-number-${t}" class="set-number">00</span>
                  &nbsp;&nbsp;<input type="number" id="button-change-decimalsecond-${t}" class="select-set-number" min="0" max="99"
                      id="decimalsecond" value="0" onclick="changeSetNumber(this.parentNode,${t})">
                  <span id="set-decimalsecond-number-${t}" class="set-number">00</span>
              </div>
          </div>
          <div id="button-all-action">
              <button class="button-action" id="button-settimer-${t}" onclick="settimeButtonVerific(this.parentNode,${t})">SET
                  TIMER</button>
              <button class="button-action" id="button-start-${t}" disabled="true" onclick="startButtonVerific(this.parentNode,${t})">START
                  TIMER</button>
              <button class="button-action" id="button-stop-${t}" disabled="true" onclick="stopButtonVerific(this.parentNode,${t})">STOP
                  TIMER</button>
              <button class="button-action" id="button-reset-${t}" disabled="true" onclick="resetButtonVerific(this.parentNode,${t})">RESET
                  TIMER</button>
          </div>
      </div>
  </div>
</div>
  `;
}
  console.log(timerArray);
  document.getElementById("frame").innerHTML = timerHTML;
}

let audioPlay = new Audio("Beep-Short.mp3")
//const myTimer = new Timer();//
let setTimer;
let buttonStart;
let buttonStop;
let buttonReset;

function changeSetNumber(_buttonsHTML, _idTimer) {

  if (document.getElementById(`button-change-hour-${_idTimer}`).value < 10) {
    document.getElementById(`set-hour-number-${_idTimer}`).innerText = `0${document.getElementById(`button-change-hour-${_idTimer}`).value}`;
  } else {
    document.getElementById(`set-hour-number-${_idTimer}`).innerText = document.getElementById(`button-change-hour-${_idTimer}`).value
  }

  if (document.getElementById(`button-change-minute-${_idTimer}`).value < 10) {
    document.getElementById(`set-minute-number-${_idTimer}`).innerText = `0${document.getElementById(`button-change-minute-${_idTimer}`).value}`;
  } else {
    document.getElementById(`set-minute-number-${_idTimer}`).innerText = document.getElementById(`button-change-minute-${_idTimer}`).value
  }

  if (document.getElementById(`button-change-second-${_idTimer}`).value < 10) {
    document.getElementById(`set-second-number-${_idTimer}`).innerText = `0${document.getElementById(`button-change-second-${_idTimer}`).value}`;
  } else {
    document.getElementById(`set-second-number-${_idTimer}`).innerText = document.getElementById(`button-change-second-${_idTimer}`).value
  }

  if (document.getElementById(`button-change-decimalsecond-${_idTimer}`).value < 10) {
    document.getElementById(`set-decimalsecond-number-${_idTimer}`).innerText = `0${document.getElementById(`button-change-decimalsecond-${_idTimer}`).value}`;
  } else {
    document.getElementById(`set-decimalsecond-number-${_idTimer}`).innerText = document.getElementById(`button-change-decimalsecond-${_idTimer}`).value
  }

}
function settimeButtonVerific(_buttonsHTML, _idTimer) {
  let setTimerTemporary = (parseInt(document.getElementById(`set-hour-number-${_idTimer}`).innerText) * 3200000) + (parseInt(document.getElementById(`set-minute-number-${_idTimer}`).innerText) * 60000) + (parseInt(document.getElementById(`set-second-number-${_idTimer}`).innerText) * 1000);
  console.log(setTimerTemporary)
  timerArray[_idTimer].setTimer(setTimerTemporary);
  document.getElementById(`timer-count-${_idTimer}`).innerHTML = timerArray[_idTimer].currentTimeString();
  console.log(setTimerTemporary);
  buttonStart = _buttonsHTML;
  buttonStart = buttonStart.querySelector(`#button-start-${_idTimer}`);
  buttonStart.disabled = false;

}
function startButtonVerific(_buttonsHTML, _idTimer) {
  buttonStart = _buttonsHTML;
  buttonsetTimer = buttonStart.querySelector(`#button-settimer-${_idTimer}`);
  buttonStop = buttonStart.querySelector(`#button-stop-${_idTimer}`);
  buttonReset = buttonStart.querySelector(`#button-reset-${_idTimer}`);
  buttonStart = buttonStart.querySelector(`#button-start-${_idTimer}`);

  if (buttonStart == undefined) {
    buttonStart.disabled = true;
    buttonsetTimer.disabled = true;
    buttonStop.disabled = false;
    buttonReset.disabled = false;
  } else {
    buttonStop.disabled = false;
    buttonReset.disabled = false;
    buttonsetTimer.disabled = true;
    buttonStart.disabled = true;
  }
  startTimerFunction(_buttonsHTML, _idTimer)
}
function stopButtonVerific(_buttonsHTML, _idTimer) {
  buttonStart = _buttonsHTML;
  buttonStop = buttonStart.querySelector(`#button-stop-${_idTimer}`)
  buttonReset = buttonStart.querySelector(`#button-reset-${_idTimer}`);
  buttonStart = buttonStart.querySelector(`#button-start-${_idTimer}`);

  buttonStop.disabled = true;
  buttonReset.disabled = false;
  buttonStart.disabled = false;
  timerArray[_idTimer].stopTimer()
}
function resetButtonVerific(_buttonsHTML, _idTimer) {
  timerArray[_idTimer].resetTimer()
  buttonStart = _buttonsHTML;
  buttonsetTimer = buttonStart.querySelector(`#button-settimer-${_idTimer}`);
  buttonStop = buttonStart.querySelector(`#button-stop-${_idTimer}`)
  buttonReset = buttonStart.querySelector(`#button-reset-${_idTimer}`);
  buttonStart = buttonStart.querySelector(`#button-start-${_idTimer}`);

  buttonStop.disabled = true;
  buttonReset.disabled = true;
  buttonsetTimer.disabled = false;
  buttonStart.disabled = true;
  document.getElementById(`timer-count-${_idTimer}`).innerHTML = "00:00:00 00"
}
function startTimerFunction(_buttonsHTML, _idTimer) {
  if (timerArray[_idTimer].getCurrentTimer() == 0) {
    //timerArray[_idTimer].setTimer();
    timerArray[_idTimer].setTimerInterval(100);
    timerArray[_idTimer].setCallbackTimerout(() => {
      console.log("[TIMER:END:EXTERNAL-FUNCTION]")
      audioPlay.play()
      document.getElementById(`timer-count-${_idTimer}`).innerHTML = "00:00:00 00"
    })
    timerArray[_idTimer].setCallbackTimerInterval(() => {
      document.getElementById(`timer-count-${_idTimer}`).innerHTML = timerArray[_idTimer].currentTimeString();
      console.log("[TIMER:TIMERINTERVAL:EXTERNAL-FUNCTION-OK]")
    })
    timerArray[_idTimer].startTimer()
  } else {
    timerArray[_idTimer].startTimer()
  }
}
