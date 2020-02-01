const md5 = require('md5');
      fs  = require('fs');
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

  return `[${today.getFullYear()}-${format(today.getMonth()+1)}-${format(today.getDate())} ${format(today.getHours())}:${format(today.getMinutes())}:${format(today.getSeconds())}]`;
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

/*
** JSONFromFile()
** Description: gets json data from file as object
** Comment:
*/
function JSONFromFile(path) {
  var data = fs.readFileSync(path);
  return JSON.parse(data);
}

/*
** writeJSONToFile()
** Description: write json to file
** Comment:
*/
function writeJSONToFile(data, path) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2)); // "null, 2" makes the file humanly readable ig
}

/*
** getServerJSON()
** Description: Get path to server's json file
** Comment:
*/
function getServerJSON(id) {
  return `${datapath}/server/${id}.json`;
}

/*
** getServerPrefix()
** Description: Get a server's prefix
** Comment:
*/
function getServerPrefix(id) {
  var json = JSONFromFile(getServerJSON(id));
  return json.prefix;
}

/*
** setServerPrefix()
** Description: Set a server's prefix
** Comment:
*/
function setServerPrefix(id, prefix) {
  var path = getServerJSON(id);
  var json = JSONFromFile(path);
  json.prefix = prefix;
  writeJSONToFile(json, path);
}

/*
** addCommand()
** Description: Add custom command to server
** Comment:
*/
function addCommand(id, name, text) {
  var path = getServerJSON(id);
  var json = JSONFromFile(path);
  json.commands[`${name}`] = text;
  writeJSONToFile(json, path);
}

/*
** deleteCommand()
** Description: Delete custom command from servers
** Comment:
*/
function deleteCommand(id, name) {
  var path = getServerJSON(id);
  var json = JSONFromFile(path);
  delete json.commands[name];
  writeJSONToFile(json, path);
}
/*
** setCommandDescription()
** Description: Set a custom command's description
** Comment:
*/
function setCommandDescription(id, name, description) {
  var path = getServerJSON(id);
  var json = JSONFromFile(path);
  json.commands.descriptions[`${name}`] = description;
  writeJSONToFile(json, path);
}


exports.setCommandDescription = setCommandDescription;
exports.getServerJSON = getServerJSON;
exports.addCommand = addCommand;
exports.deleteCommand = deleteCommand;
exports.getServerPrefix = getServerPrefix;
exports.setServerPrefix = setServerPrefix;
exports.JSONFromFile = JSONFromFile;
exports.writeJSONToFile = writeJSONToFile;
exports.cmdCount = cmdCount;
exports.timestamp = timestamp;
exports.hashCode = hashCode;
