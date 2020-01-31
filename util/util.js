const md5 = require('md5');
/*
** hashCode()
** Description: Turns a string into a number (same output for same string)
** Comment: no idea how the fuck this works but it does so i dont care
*/
var seed=96343;
const hashCode = (s, t) => {
  s=s+s;
  if(t == 0 || isNaN(t)) var t=seed;
for(var i = 0, h = 0; i < s.length; i++) {
    h = h + Math.abs(s.charCodeAt(i)*s.charCodeAt(i)*33+s.length*t+s.charCodeAt(i)*27*(t*3)) | 0;
  }
  var k = md5(h+s+t);
return h;
}

/*
** timestamp()
** Description: Returns a timestamp
** Comment: when i was transferring this i saw that it looked like cooked balls (very big and inflated) so i made it better
*/
function timestamp() {
  var format = function(num) {
    if (num < 10) {
       num = "0" + num;
    }
    return num;
  }

  var today = new Date();

  var hours = format(today.getHours());
  var minutes = format(today.getMinutes());
  var seconds = format(today.getSeconds());
  var month = format(today.getMonth()+1);
  var day = format(today.getDate());
  var year = today.getFullYear();

  return `[${year}-${month}-${day} ${hours}:${minutes}:${seconds}]`;
}

/*
** cmdCount()
** Description: Gets the amount of commands currently registered
** Comment: needed for bot startup
*/
function cmdCount() {
  var count = 0;
  for (var command in commands) {
    count++;
  }
  return count;
}

exports.cmdCount = cmdCount;
exports.timestamp = timestamp;
exports.hashCode = hashCode;
