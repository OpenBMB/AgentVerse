var GetPeriodMS = function (period) {
    if (typeof (period) === 'number') {
        return period;
    }

    var config = period;
    var days = config.day || config.d || 0;
    var hours = config.hour || config.h || 0;
    var minutes = config.minute || config.m || 0;
    var seconds = config.second || config.s || 0;

    hours += days * 24;
    minutes += hours * 60;
    seconds += minutes * 60;
    period = seconds * 1000;

    return period;
}

export default GetPeriodMS;