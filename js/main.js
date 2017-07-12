// these are the days of the week for each month, in order
let cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let day_name = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

let selectedMonth, selectedYear;
let today, todayDay, todayMonth, todayYear;


function setTodayColor() {
    // day-today
}


function isCurrentMonth() {
    if (selectedMonth === todayMonth && selectedYear === todayYear) {
        setTodayColor();
        return true;
    }
    return false;
}
let day_no, first_day, days;
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
    if (newselectedMonth != 0 || newselectedMonth != 11) {
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

function createMonth(newselectedMonth, newselectedYear) {
    setToday();
    createMonthTitle(newselectedMonth, newselectedYear);
    startMonthFromTo(newselectedMonth, newselectedYear);

    /* day_no, days */
    /*-----------------------*/
    /*     calendar body     */
    let c;
    // create first row week number 
    let weeknumber = "<li><div class='vecka'> </div></li>";
    calendar = weeknumber;
    // create first row perv month days 
    for (c = 0; c <= 6; c++) {
        if (c == day_no) {
            break;
        }
        calendar += emptyday;
    }

    // create first row days 

    let count = 1;
    for (; c <= 6; c++) {
        calendar += "<li><div class='day'>" + count + "<div class='day-name'>Saturday</div></div></li>";
        count++;
    }

    let loop;
    //rest of the date rows
    let r;
    for (r = 3; r <= 7; r++) {
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
            calendar += "<li><div class='day'>" + count + "<div class='day-name'>Saturday</div></div></li>";
            count++;
            if (r != 7) {
                loop++;
            }
        }

    }

    debugger;
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
    //console.log(calendar);
}

let newselectedYear, newselectedMonth;

function nextMonth() {
    newselectedMonth = newselectedMonth + 1;
    createMonth(newselectedMonth, newselectedYear);
    console.log(newselectedMonth);
}

function prevMonth() {
    newselectedMonth = newselectedMonth - 1;
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
