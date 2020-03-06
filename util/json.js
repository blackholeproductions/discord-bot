const md5 = require('md5'),
      fs  = require('fs');
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
  fs.writeFileSync(path, JSON.stringify(data)); // "data, null, 2" makes the file humanly readable if necessary
}

/*
** getServerJSON()
** Description: Get path to server's json file
** Comment:
*/
function getServerJSON(id) {
  var file = `${datapath}/server/${id}.json`;
  if (!fs.existsSync(file)) {
    var defaultJson = {
      prefix: config.prefix,
      commands: {
        descriptions: {}
      },
      modules: {}
    }
    writeJSONToFile(defaultJson, file);
  }
  return file;
}

/*
** getUserJSON()
** Description: Get path to user's json file
*/
function getUserJSON(id) {
  var file = `${datapath}/user/${id}.json`;
  if (!fs.existsSync(file)) {
    writeJSONToFile({}, file);
  }
  return file;
}

exports.JSONFromFile = JSONFromFile;
exports.writeJSONToFile = writeJSONToFile;
exports.getServerJSON = getServerJSON;
exports.getUserJSON = getUserJSON;
