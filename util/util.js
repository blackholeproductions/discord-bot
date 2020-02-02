const md5 = require('md5');
      fs  = require('fs');
/*
** seededRand()
** Description: Turns a string into a number (same output for same string)
** Comment: rewritten, brand new
*/

const seededRand = (seed, localseed) => {
  var random = 0;
  if (localseed == 0 || isNaN(localseed)) localseed = 78125.905218;

  var randomize = function(value) {
    var newvalue = 0;
    value = md5(value);
    for (var i = 0; i < value.length; i++) {
      newvalue += Math.abs((value.charCodeAt(i)-value.charCodeAt(value.length-1-i))*localseed);
    }
    return Math.round(newvalue);
  }

  random = randomize(md5(seed));

  return random;
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
exports.seededRand = seededRand;
