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
const enableUser = (mod, id) => {
  var path = util.json.getUserJSON(id);
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
const isEnabledUser = (mod, id) => {
  var data = util.json.JSONFromFile(util.json.getUserJSON(id));
  if (data.modules == undefined || data.modules[mod] == undefined) return property(mod, "enabled_by_default");
  if (data.modules[mod]) return true;
}
/*
** disable(mod, id)
** Description: disables the given module in the given server
*/

const disable = (mod, id) => {
  var path = util.json.getServerJSON(id);
  var data = util.json.JSONFromFile(path);
  if (data.modules[mod] != undefined) {
    delete data.modules[mod];
    util.json.writeJSONToFile(data, path);
  } else console.log(`Couldn't find module ${mod} for server ${id}`);
}
/*
** disableUser(mod, id)
** Description: disables the given module for the given user.
*/
const disableUser = (mod, id) => {
  var path = util.json.getUserJSON(id);
  var data = util.json.JSONFromFile(path);
  if (data.modules[mod] != undefined) {
    delete data.modules[mod];
    util.json.writeJSONToFile(data, path);
  } else console.log(`Couldn't find module ${mod} for user ${id}`);
}
/*
** property(mod, id, property)
** Description: gets a property of a module
*/
const property = (mod, property, id) => {
  var selectedmodule;
  if (modules[mod] !== undefined && modules[mod][property] !== undefined) {
    selectedmodule = modules[mod];
  } else if (usermodules[mod] !== undefined && usermodules[mod][property] !== undefined) {
    selectedmodule = usermodules[mod];
  } else {
    return false;
  }
  if (property == "tutorial") {
    return selectedmodule[property].replace(/\${serverprefix}/g, util.getServerPrefix(id));
  } else {
    return selectedmodule[property];
  }
}

exports.enable = enable;
exports.isEnabled = isEnabled;
exports.disable = disable;
exports.enableUser = enableUser;
exports.isEnabledUser = isEnabledUser;
exports.disableUser = disableUser;
exports.property = property;
