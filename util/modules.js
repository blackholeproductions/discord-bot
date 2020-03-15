const md5  = require('md5'),
      fs   = require('fs');
module.exports = {
  /*
  ** enable()
  ** Description: Enables the given module in the given server
  ** Comment:
  */
  enable(mod, id) {
    var path = util.json.getServerJSON(id);
    var data = util.json.JSONFromFile(path);
    if (data.modules == undefined) data.modules = {};
    data.modules[mod] = true;
    util.json.writeJSONToFile(data, path);
  },
  enableUser(mod, id) {
    var path = util.json.getUserJSON(id);
    var data = util.json.JSONFromFile(path);
    if (data.modules == undefined) data.modules = {};
    data.modules[mod] = true;
    util.json.writeJSONToFile(data, path);
  },
  /*
  ** isEnabled()
  ** Description: Checks if the given module is enabled in the given server
  ** Comment:
  */

  isEnabled(mod, id) {
    var data = util.json.JSONFromFile(util.json.getServerJSON(id));
    if (data.modules == undefined || data.modules[mod] == undefined) return false;
    if (data.modules[mod]) return true; else return false;
  },
  isEnabledUser(mod, id) {
    var data = util.json.JSONFromFile(util.json.getUserJSON(id));
    if (data.modules == undefined || data.modules[mod] == undefined) return this.property(mod, "enabled_by_default");
    if (data.modules[mod]) return true;
  },
  /*
  ** disable(mod, id)
  ** Description: disables the given module in the given server
  */
  disable(mod, id) {
    var path = util.json.getServerJSON(id);
    var data = util.json.JSONFromFile(path);
    if (data.modules[mod] != undefined) {
      delete data.modules[mod];
      util.json.writeJSONToFile(data, path);
    } else console.log(`Couldn't find module ${mod} for server ${id}`);
  },
  /*
  ** disableUser(mod, id)
  ** Description: disables the given module for the given user.
  */
  disableUser(mod, id) {
    var path = util.json.getUserJSON(id);
    var data = util.json.JSONFromFile(path);
    if (data.modules[mod] != undefined) {
      delete data.modules[mod];
      util.json.writeJSONToFile(data, path);
    } else console.log(`Couldn't find module ${mod} for user ${id}`);
  },
  /*
  ** property(mod, id, property)
  ** Description: gets a property of a module
  */
  property(mod, property, id) {
    var selectedmodule;
    if (modules[mod] !== undefined && modules[mod][property] !== undefined) {
      selectedmodule = modules[mod];
    } else if (usermodules[mod] !== undefined && usermodules[mod][property] !== undefined) {
      selectedmodule = usermodules[mod];
    } else {
      return false;
    }
    if (property == "tutorial") {
      return selectedmodule[property].replace(/\${serverprefix}/g, util.general.getServerPrefix(id));
    } else {
      return selectedmodule[property];
    }
  }
}
