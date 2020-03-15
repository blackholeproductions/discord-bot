
const fs = require('fs');
var events = ['death'];
module.exports = {
  fireEvent(eventName, extraData) {
    if (eventName !== "checkRevivals" && eventName !== "regenHealth") util.general.log(`${eventName} event fired. ${JSON.stringify(extraData, null, 2) ? `\n\`\`\`${JSON.stringify(extraData, null, 2)}\`\`\`` : ""}`);
    switch(eventName) {
      case 'death':
        var path = `${__basedir}/data/game/revivals.json`,
            data = util.json.JSONFromFile(path);
        data[extraData.userID] = new Date(Date.now()+20000);
        client.users.cache.get(extraData.userID).send("You died! You will revive in 24 hours. (Currently 20 seconds for debug)").catch();
        util.json.writeJSONToFile(data, path);
        break;
      case 'revive':
        util.stats.updateStat(extraData.userID, "hp", util.stats.getStat(extraData.userID, "max_hp")/2);
        client.users.cache.get(extraData.userID).send("You have been revived").catch();
        break;
      case 'checkRevivals':
        var path = `${__basedir}/data/game/revivals.json`,
            data = util.json.JSONFromFile(path),
            i = 0;
        for (var userID in data) {
          if (new Date(data[userID]).getTime() <= Date.now()) {
            i++;
            delete data[userID];
            this.fireEvent("revive", { userID: userID });
          }
        }
        util.json.writeJSONToFile(data, path);
        if (i > 0) return `Revived ${i} users`;
        break;
      case 'statUpdated':
        if (extraData.stat == 'hp') {
          if (extraData.newValue <= 0) {
            this.fireEvent("death", { userID: extraData.userID });
          } else if (extraData.newValue > 0 && extraData.newValue < util.stats.getStat(extraData.userID, "max_hp")) {
            this.fireEvent("setDamaged", { userID: extraData.userID });
          } else if (extraData.newValue == util.stats.getStat(extraData.userID, "max_hp")) {
            this.fireEvent("setUndamaged", { userID: extraData.userID });
          }
        }
        break;
      case "setDamaged":
        var path = `${__basedir}/data/game/damaged.json`,
            data = util.json.JSONFromFile(path);
        if (data.list == undefined) data.list = [];
        if (!data.list.includes(extraData.userID))data.list.push(extraData.userID);
        util.json.writeJSONToFile(data, path);
        break;
      case "setUndamaged":
        var path = `${__basedir}/data/game/damaged.json`,
            data = util.json.JSONFromFile(path);
        if (data.list == undefined) data.list = [];
        data.list.splice(data.list.indexOf(extraData.userID), 1);
        util.json.writeJSONToFile(data, path);
        break;
      case 'regenHealth':
        var path = `${__basedir}/data/game/damaged.json`,
            data = util.json.JSONFromFile(path);
        var num = 0;
        for (var i in data.list) {
          num++;
          util.stats.addStat(data.list[i], "hp", 1);
        }
        return num;
        break;
      default:
        console.error(`An invalid event (${eventName}) was fired`);
        break;
    }
  },
  tick() {
    setInterval(function() {
      //util.general.log("Game tick.");
      var regens = util.events.fireEvent("regenHealth");
      if (regens !== 0) util.general.log(`Regenerated ${regens} users`);
      var revivals = util.events.fireEvent("checkRevivals");
      if (revivals !== undefined) util.general.log(revivals);
    }, 30000);
  }
}
