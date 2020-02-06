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

exports.JSONFromFile = JSONFromFile;
exports.writeJSONToFile = writeJSONToFile;
exports.getServerJSON = getServerJSON;
