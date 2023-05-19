var GetDate = function (timeStamp) {
    return GetDateObject(timeStamp).getDate();
}

var GetWeek =  function (timeStamp) {
    var date = GetDateObject(timeStamp);
    var Jan1st = new Date(date.getFullYear(), 0, 1);
    var week = Math.ceil((((date - Jan1st) / 86400000) + Jan1st.getDay() + 1) / 7);
    return week;
}

var GetMonth = function (timeStamp) {
    return GetDateObject(timeStamp).getMonth() + 1;
}

var GetYear = function (timeStamp) {
    return GetDateObject(timeStamp).getFullYear();
}


var GetDateObject = function (timeStamp) {
    return (timeStamp) ? (new Date(timeStamp)) : (new Date());
}

export {
    GetDate,
    GetWeek,
    GetMonth,
    GetYear
};