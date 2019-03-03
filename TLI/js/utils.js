
function differenceBetweenTwoDateInDays(date1, date2){
    let timeDiff = Math.abs(date2.getTime() - date1.getTime());
    let difference = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return difference;
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, ccontent){

    if(cname && ccontent){
        document.cookie = cname+'='+ccontent;
    }
}

function formatDate(date) {

    date = new Date(date);
  
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
  
    return day + '/' + month + '/' + year;
  }