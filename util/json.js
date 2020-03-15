const md5 = require('md5'),
      fs  = require('fs');
module.exports = {
  /*
  ** JSONFromFile()
  ** Description: gets json data from file as object
  ** Comment:
  */
  JSONFromFile(path) {
    var data = fs.readFileSync(path);
    return JSON.parse(data);
  },
  /*
  ** writeJSONToFile()
  ** Description: write json to file
  ** Comment:
  */
  writeJSONToFile(data, path) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2)); // "(data, null, 2)" makes the file humanly readable if necessary
  },
  /*
  ** getServerJSON()
  ** Description: Get path to server's json file
  ** Comment:
  */
  getServerJSON(id) {
    var file = `${datapath}/server/${id}.json`;
    if (!fs.existsSync(file)) {
      var defaultJson = {
        prefix: config.prefix,
        commands: {
          descriptions: {}
        },
        modules: {}
      }
      this.writeJSONToFile(defaultJson, file);
    }
    return file;
  },
  /*
  ** getUserJSON()
  ** Description: Get path to user's json file
  */
  getUserJSON(id) {
    var file = `${datapath}/user/${id}.json`;
    if (!fs.existsSync(file)) {
      this.writeJSONToFile({}, file);
    }
    return file;
  }
}
