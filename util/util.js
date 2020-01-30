const md5 = require('md5');

// no idea how the fuck this works but it does so i dont care
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

exports.hashCode = hashCode;
