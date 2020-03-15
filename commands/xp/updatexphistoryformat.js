module.exports = {
  desc: "update xp format",
  admin: true,
  execute(message, command) {
    var usertotals = {};
    var path = util.json.getServerJSON(message.guild.id);
    var data = util.json.JSONFromFile(path);
    var olddata = data;
    for (var day in olddata.xp.history) {
      if (day.length == 5) {
        for (var user in olddata.xp.history[day]) {
          var gained = olddata.xp.history[day][user];
          if (usertotals[user] == undefined) usertotals[user] = 0;
          if (typeof data.xp.history[day][user] != 'object') data.xp.history[day][user] = {};
          usertotals[user] += gained;
          data.xp.history[day][user].amount = usertotals[user];
          data.xp.history[day][user].rank = getRank(message, user, day);
        }
      }
    }
    util.json.writeJSONToFile(data, path);
    message.channel.send("Successful");
  },
  getRank(message, user, day) {
    var path = util.json.getServerJSON(message.guild.id);
    var data = util.json.JSONFromFile(path);
    var array = [];
    for (var xp in data.xp.history[day]) {
      if (xp == '218525899535024129') array.push({ id: xp, xp: data.xp.history[day][xp]+14869 });
      else array.push({ id: xp, xp: data.xp.history[day][xp] });
    }
    array.sort(function(a, b) {
      return b.xp - a.xp;
    });
    var i = 0;
    for (var object in array) {
      if (array[object].id == "672280373065154569") continue; // Skip bot user from leaderboard
      i++;
      if (array[object].id !== user) continue;
      return i;
    }
    return "Unknown Rank";
  }
}
