//as soon as the page loads
window.onload = function() {
    $('#lap').on('click', stopwatch.recordLap);
    $('#stop').on('click', stopwatch.stop);
    $('#reset').on('click', stopwatch.reset);
    $('#start').on('click', stopwatch.start);
};
//holding setInterval that runs the stopwatch
var intervalId;
//prevendting the clock from being sped up unncessarily
var clockRunning = false;
//creating stopwatch option
var stopwatch = {
    time: 0,
    lap: 1,

    reset: function() {
        stopwatch.time = 0;
        stopwatch.lap = 1;
        //time shows "00:00"
        $("#show-time").text("00:00");
        //Empty laps div
        $("#laps").text("");
    },
    start: function() {
        if(!clockRunning) {
            intervalId = setInterval(stopwatch.count, 1000);
            clockRunning = true;
        }
    },
    stop: function() {
        clearInterval(intervalId);
        clockRunning = false;
    },
    recordLap: function() {
        var converted = stopwatch.timeConverter(stopwatch.time);
        $('#laps').append('<p>Lap ' + stopwatch.lap + ' : ' + converted + '</p>');
        stopwatch.lap++;
    },
    count: function() {
        stopwatch.time++;
        var converted = stopwatch.timeConverter(stopwatch.time);
        console.log(converted);
        $('#show-time').text(converted);
    },
    timeConverter: function(t) {
        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        
        if (minutes === 0) {
            minutes = "00";
        }
        else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    }
}
