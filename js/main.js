// these are the days of the week for each month, in order
let cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let day_name = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

let selectedMonth, selectedYear;
let today, todayDay, todayMonth, todayYear;

let day_no, first_day, days;
let prev_day_no, prev_first_day, prev_days;


function getWeekNumbe(d){
    d = new Date(+d);
    d.setHours(0,0,0,0);
    d.setDate(d.getDate()+4-(d.getDay()||7));
    return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
};
console.log('The current ISO week number is ' + getWeekNumbe(new Date()));

function prevMonthTo(newselectedMonth, newselectedYear) {
    let first_date = months[newselectedMonth] + " " + 1 + " " + newselectedYear;
    //September 1 2014
    let tmp = new Date(first_date).toDateString();
    //Mon Sep 01 2014 ...
    let prev_first_day = tmp.substring(0, 3);    //Mon
    tmp = new Date(first_date).toDateString();
    prev_day_no = day_name.indexOf(prev_first_day);   //1
    prev_days = new Date(newselectedYear, newselectedMonth + 1, 0).getDate();    //30
    return prev_days;
}
function startMonthFromTo(newselectedMonth, newselectedYear) {
    let first_date = months[newselectedMonth] + " " + 1 + " " + newselectedYear;
    //September 1 2014
    let tmp = new Date(first_date).toDateString();
    //Mon Sep 01 2014 ...
    let first_day = tmp.substring(0, 3);    //Mon
    tmp = new Date(first_date).toDateString();
    day_no = day_name.indexOf(first_day);   //1
    days = new Date(newselectedYear, newselectedMonth + 1, 0).getDate();    //30

}


function createMonthTitle(newselectedMonth, newselectedYear) {
    document.getElementById('calendar-title').innerHTML = months[newselectedMonth] + " " + newselectedYear;
    if (newselectedMonth != 0 && newselectedMonth != 11) {
        document.getElementById('next').innerHTML = months[newselectedMonth + 1];
        document.getElementById('prev').innerHTML = months[newselectedMonth - 1];
    }
    else if (newselectedMonth == 11) {
        document.getElementById('next').innerHTML = months[0];
        document.getElementById('prev').innerHTML = months[newselectedMonth - 1];
    }
    else {
        document.getElementById('next').innerHTML = months[newselectedMonth + 1];
        document.getElementById('prev').innerHTML = months[11];
    }
}

let calendar = "";
let emptyday = "<li><div class='day old-month'> </div></li>";


function getDayFormated(count, weekday) {
    let result="";
    switch (weekday) {
        case 0:
            result = "<li><div class='day'>" + count + "<div class='day-name'>Monday</div></div></li>";
            break;
        case 1:
            result = "<li><div class='day'>" + count + "<div class='day-name'>Tuesday</div></div></li>";
            break;
        case 2:
            result = "<li><div class='day'>" + count + "<div class='day-name'>Wednesday</div></div></li>";
            break;
        case 3:
            result = "<li><div class='day'>" + count + "<div class='day-name'>Thursday</div></div></li>";
            break;
        case 4:
            result = "<li><div class='day'>" + count + "<div class='day-name'>Friday</div></div></li>";
            break;
        case 5:
            result = "<li><div class='day'>" + count + "<div class='day-name'>Saturday</div></div></li>";
            break;
        case 6:
            result = "<li><div class='day day-weekend'>" + count + "<div class='day-name'>Sunday</div></div></li>";
            break;
        default: 
            break;
    }

    return result;
}
function createMonth(newselectedMonth, newselectedYear) {
    setToday();
    createMonthTitle(newselectedMonth, newselectedYear);
    startMonthFromTo(newselectedMonth, newselectedYear);

    /* day_no, days */
    /*-----------------------*/
    /*     calendar body     */
    let c;
    // create first row week number
    let wnum=getWeekNumbe(new Date(newselectedYear, newselectedMonth , 1)); 
    let weeknumber = "<li><div class='vecka'>"+wnum+"</div></li>";
    calendar = weeknumber;
    // create first row perv month days 
    let prevYear, prevMonth;

    if (newselectedMonth != 0) {
        prevMonth = newselectedMonth - 1;
        prevYear = newselectedYear;
    }
    else {
        prevMonth = 11;
        prevYear = newselectedYear - 1;
    }
    let prev_month_start = prevMonthTo(prevMonth, prevYear) - day_no + 1;
    for (c = 0; c <= 6; c++) {
        if (c == day_no) {
            break;
        }
        calendar += "<li><div class='day old-month'>" + prev_month_start + " </div></li>";
        prev_month_start++;
    }

    // create first row days 

    let count = 1;
    for (; c <= 6; c++) {
        calendar += getDayFormated(count, c) ;
        count++;
    }

    let loop;
    //rest of the date rows
    let r;
    for (r = 3; r <= 7; r++) {
        wnum++;
        weeknumber = "<li><div class='vecka'>"+wnum+"</div></li>";
        // new row
        if (r != 7) {
            loop = 0;
        }
        for (c = 0; c <= 6; c++) {
            if (count > days) { // if last day of month 
                break;
            }
            if (c == 0) {
                calendar += weeknumber;
            }
            calendar += getDayFormated(count, c);
            count++;
            if (r != 7) {
                loop++;
            }
        }

    }

    //debugger;
    count = 1;
    if (loop != 7) {
        c = loop;
    }
    if (c == 0) {
        calendar += weeknumber;
    }
    for (; c <= 6; c++) {
        calendar += "<li><div class='day new-month'>" + count + "</div></li>";
        count++;
    }

    // next week
    if (r != 8) {
        calendar += weeknumber;
        for (c = 0; c <= 6; c++) {
            calendar += "<li><div class='day new-month'>" + count + "</div></li>";
            count++;
        }
    }
    /*-----------------------*/
    document.getElementById('calendar_wrapper').innerHTML = calendar;

}

let newselectedYear, newselectedMonth;

function nextMonth() {

    if (newselectedMonth == 11) {
        newselectedMonth = 0;
        newselectedYear = newselectedYear + 1;
    }
    else {
        newselectedMonth = newselectedMonth + 1;
    }
    createMonth(newselectedMonth, newselectedYear);
    console.log(newselectedMonth);
}

function prevMonth() {

    if (newselectedMonth == 0) {
        newselectedMonth = 11;
        newselectedYear = newselectedYear - 1;
    }
    else {
        newselectedMonth = newselectedMonth - 1;
    }
    createMonth(newselectedMonth, newselectedYear);
    console.log(newselectedMonth);

}
//var calendar = get_calendar(day_no, days);

function setToday() {
    today = new Date();
    todayDay = today.getDate();
    todayMonth = today.getMonth();
    selectedMonth = todayMonth;
    todayYear = today.getFullYear();
    selectedYear = todayYear;
}
// On Load of the window
window.onload = function () {

    setToday();
    createMonth(selectedMonth, selectedYear);
    newselectedYear = selectedYear;
    newselectedMonth = selectedMonth;
}
