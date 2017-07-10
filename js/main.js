var w = $(window),
    respCal = function() {
    var ww = w.width(),
        dayEmpty = $('.day:empty').parent();
    if(ww < 600) {
        dayEmpty.addClass('empty');    
    } else {
        dayEmpty.removeClass('empty');
    }
}

w.on('load resize', function() {
    respCal();
});