
var stats = {
  hp: {
    default: 100
  },
  max_hp: {
    default: 100
  },
  skill_points: {
    default: 0
  }
};
module.exports = {
  giveDefaultStats(userID) {
    var path = util.json.getUserJSON(userID),
        data = util.json.JSONFromFile(path);
    if (data.game == undefined) data.game = {};
    if (data.game.stats == undefined) data.game.stats = {};
    for (var stat in stats) {
      if (data.game.stats[stat] == undefined) data.game.stats[stat] = stats[stat].default;
    }
    util.general.log(`Gave ${userID} default stats`);
    util.json.writeJSONToFile(data, path);
  },
  getStats(userID) {
    var path = util.json.getUserJSON(userID),
        data = util.json.JSONFromFile(path),
        embed = new Discord.MessageEmbed(),
        user = client.users.cache.get(userID);
    if (data.game == undefined) data.game = {};
    if (data.game.stats == undefined) {
      data.game.stats = {};
      this.giveDefaultStats(userID);
      data = util.json.JSONFromFile(path);
    }
    var stats = data.game.stats;
    if (user) embed.setAuthor(`${user.username}`, `${user.displayAvatarURL()}`);
    embed.addField("Health", `${stats.hp}/${stats.max_hp} (${Math.round((stats.hp/stats.max_hp)*100)}%) ${util.general.progressBar((stats.hp/stats.max_hp)*100, 10)}`);
    embed.addField("Skill Points", `${stats.skill_points}`);
    return embed;
  },
  getStat(userID, stat) {
    var path = util.json.getUserJSON(userID),
        data = util.json.JSONFromFile(path);
    if (data.game == undefined) data.game = {};
    if (data.game.stats == undefined) {
      data.game.stats = {};
      this.giveDefaultStats(userID);
      data = util.json.JSONFromFile(path);
    }
    if (data.game.stats[stat] == undefined) return 0; else return data.game.stats[stat];
  },
  updateStat(userID, stat, value) {
    var path = util.json.getUserJSON(userID),
        data = util.json.JSONFromFile(path);
    if (data.game == undefined) data.game = {};
    if (data.game.stats == undefined) {
      data.game.stats = {};
      this.giveDefaultStats(userID);
      data = util.json.JSONFromFile(path);
    }
    var old = data.game.stats[stat];
    data.game.stats[stat] = value;
    util.events.fireEvent("statUpdated", { stat: stat, userID: userID, oldValue: old, newValue: value });
    util.json.writeJSONToFile(data, path);
  },
  addStat(userID, stat, value) {
    this.updateStat(userID, stat, this.getStat(userID, stat)+value);
  }
}
