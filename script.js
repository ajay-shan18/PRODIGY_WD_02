
(function() {
  var hours = 00;
  var minutes = 00;
  var seconds = 00;
  var tens = 00;
  var aHours = document.getElementById("hours");
  var aMinutes = document.getElementById("minutes");
  var aSeconds = document.getElementById("seconds");
  var aTens = document.getElementById("tens");
  var Start = document.getElementById("start");
  var Stop = document.getElementById("stop");
  var reset = document.getElementById("reset");
  var clear = document.getElementById("clear");
  var Interval;
  var Lap = document.getElementById("lap");
  var Laps = document.getElementById("laps");
  var lapCount = 1;
  var lapsContent = document.getElementById("laps").innerHTML;
  var lastLap = { hours: 0, minutes: 0, tens: 0, seconds: 0 };

  function leftPad(value) {
    return value < 10 ? "0" + value : value;
  }
  
  // localStorage detection
  function supportsLocalStorage() {
    return typeof(Storage)!== 'undefined';
  }
  
  $('#stop').hide();

  Start.onclick = function() {
    clearInterval(Interval);
    Interval = setInterval(startTimer, 10);
    $('#stop').toggle();
    $('#start').toggle();
  };

  Stop.onclick = function() {
    clearInterval(Interval);
    $('#start').toggle();
    $('#stop').toggle();
  };

  reset.onclick = function() {
    clearInterval(Interval);
    hours = "00";
    minutes = "00";
    seconds = "00";
    tens = "00";
    aHours.innerHTML = hours;
    aMinutes.innerHTML = minutes;
    aSeconds.innerHTML = seconds;
    aTens.innerHTML = tens;
  };
  
  function startTimer() {
    
    tens++;

    if (tens < 9) {
      aTens.innerHTML = "0" + tens;
    }

    if (tens > 9) {
      aTens.innerHTML = tens;
    }

    if (tens > 99) {
      // console.log("seconds");
      seconds++;
      aSeconds.innerHTML = "0" + seconds;
      tens = 0;
      aTens.innerHTML = "0" + 0;
    }

    if (seconds > 9) {
      aSeconds.innerHTML = seconds;
    }

    if (seconds > 59) {
      // console.log("minutes");
      minutes++;
      aMinutes.innerHTML = "0" + minutes;
      seconds = 0;
      aSeconds.innerHTML = "0" + 0;
      tens = 0;
      aTens.innerHTML = "0" + 0;
    }

    if (minutes > 9) {
      aMinutes.innerHTML = minutes;
    }

    if (minutes > 59) {
      // console.log("seconds");
      hours++;
      aHours.innerHTML = "0" + hours;
      minutes = 0;
      aMinutes.innerHTML = "0" + 0;
      seconds = 0;
      aSeconds.innerHTML = "0" + 0;
      tens = 0;
      aTens.innerHTML = "0" + 0;
    }

    if (hours > 9) {
      aHours.innerHTML = hours;
    }
  }
  
  

  // Run the support check
  if (!supportsLocalStorage()) {
    console.log('browser storage not supported')
    
    Lap.onclick = function() {
      var lapHours = hours - lastLap.hours;
      var lapMinutes = minutes - lastLap.minutes;
      if (lapMinutes < 0) {
        var lapMinutes = minutes - lastLap.minutes + 60;
      }
      var lapSeconds = seconds - lastLap.seconds;
      if (lapSeconds < 0) {
        var lapSeconds = seconds - lastLap.seconds + 60;
      }
      var lapTens = tens - lastLap.tens;
      if (lapTens < 0) {
        var lapTens = tens - lastLap.tens + 100;
      }
      lastLap = {
        tens: tens,
        seconds: seconds,
        minutes: minutes,
        hours: hours
      };

      Laps.innerHTML +=
        "<li>" +
        leftPad(lapHours) +
        ":" +
        leftPad(lapMinutes) +
        ":" +
        leftPad(lapSeconds) +
        ":" +
        leftPad(lapTens) +
        "</li>";
    };
    // Just clear laps list
    clear.onclick = function() {
      Laps.innerHTML = '';
    }
  } else {

    // HTML5 localStorage Support
    try {
      Lap.onclick = function() {
        var lapHours = hours - lastLap.hours;
        var lapMinutes = minutes - lastLap.minutes;
        if (lapMinutes < 0) {
          var lapMinutes = minutes - lastLap.minutes + 60;
        }
        var lapSeconds = seconds - lastLap.seconds;
        if (lapSeconds < 0) {
          var lapSeconds = seconds - lastLap.seconds + 60;
        }
        var lapTens = tens - lastLap.tens;
        if (lapTens < 0) {
          var lapTens = tens - lastLap.tens + 100;
        }
        lastLap = {
          tens: tens,
          seconds: seconds,
          minutes: minutes,
          hours: hours
        };

        Laps.innerHTML +=
          "<li>" +
          "Lap " + lapCount++ + " – " +
          leftPad(lapHours) +
          ":" +
          leftPad(lapMinutes) +
          ":" +
          leftPad(lapSeconds) +
          "." +
          leftPad(lapTens) +
          "</li>";
        
        localStorage.setItem('laps', JSON.stringify(Laps.innerHTML));
        // console.log(localStorage.getItem('laps'));
      };

      clear.onclick = function() {
        Laps.innerHTML = '';
        localStorage.removeItem('laps');
      }
    }
    
    catch (e) {
    
      // If any errors, catch and alert the user
      if (e == QUOTA_EXCEEDED_ERR) {
        alert('Quota exceeded!');
      }
    }
  
    if (localStorage.getItem('laps')) {
    
      // Retrieve the item
      var storedLaps = JSON.parse(localStorage.getItem('laps'));
      $('#laps').html(storedLaps);
      // console.log(localStorage.getItem('laps'));
    }
  }
})();