var GetTime = function (timeStamp) {
    var date = (timeStamp) ? (new Date(timeStamp)) : (new Date());
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var Jan1st = new Date(date.getFullYear(), 0, 1);
    var w = Math.ceil((((date - Jan1st) / 86400000) + Jan1st.getDay() + 1) / 7);
    return {
        d: `${y}-${m}-${d}`,  // day filter
        w: `${y}-${w}`,       // week filter
        m: `${y}-${m}`,       // month filter
        y: `${y}`,            // year filter
        a: ''                 // all-time filter
    };
}

export default GetTime;