const md5  = require('md5'),
      fs   = require('fs'),
      util = require(`${__basedir}/util/util.js`);
/*
** enable()
** Description: Enables the given module in the given server
** Comment:
*/

const enable = (mod, id) => {
  var path = util.json.getServerJSON(id);
  var data = util.json.JSONFromFile(path);
  if (data.modules == undefined) data.modules = {};
  data.modules[mod] = true;
  util.json.writeJSONToFile(data, path);
}

/*
** isEnabled()
** Description: Checks if the given module is enabled in the given server
** Comment:
*/

const isEnabled = (mod, id) => {
  var data = util.json.JSONFromFile(util.json.getServerJSON(id));
  if (data.modules == undefined || data.modules[mod] == undefined) return false;
  if (data.modules[mod]) return true; else return false;
}
/*
** disable()
** Description: disables the given module in the given server
** Comment:
*/

const disable = (mod, id) => {
  var path = util.json.getServerJSON(id);
  var data = util.json.JSONFromFile(path);
  if (data.modules[mod] != undefined) {
    delete data.modules[mod];
    util.json.writeJSONToFile(data, path);
  } else console.log(`Couldn't find module ${mod} for ${serverid}`);
}



exports.enable = enable;
exports.isEnabled = isEnabled;
exports.disable = disable;
