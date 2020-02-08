const desc = "Just a test command",
      args = "<day> <page>";
const execute = (message, command) => {
  var devlogPath = `${__basedir}/data/bot/starts.json`,
      devlog     = util.json.JSONFromFile(devlogPath),
      output     = "",
      days       = {},
      page       = command.getArgs()[1] || 1,
      pageSize   = 10;
  for (var time in devlog) {
    var date = new Date(parseInt(time));
    var day = Math.floor((date.getTime()-date.getTimezoneOffset()*60000)/86400000); // Get number of days since epoch (timezone stuff cus it was off by that many hours)
    if (days[day] == undefined) {
      days[day] = {};
    }
    days[day][time] = devlog[time];
  }
  if (command.getArgs().length > 0) {
    var day = command.getArgs()[0];
    output += `*${new Date(day*86400000).toLocaleDateString("en-US")}*:\n`;
    var i = 0;
    for (var time in days[day]) {
      i++;
      if (i < (page-1)*pageSize) continue;
      if (i > page*pageSize) break;
      output += `**${new Date(parseInt(time)).toLocaleString("en-US", { hour12: false } ).split(",")[1]}**: ${days[day][time]}\n`;
    }
    var count = 0;
    for (var time in days[day]) {
      count++;
    }
    output += `Page ${page}/${Math.ceil(count/pageSize)}`;
  } else { // if no day specified
    for (var day in days) {
      var count = 0;
      for (var time in days[day]) {
        count++;
      }
      output += `**${new Date(day*86400000).toLocaleDateString("en-US")}** (${day}): ${count}\n`;
    }
  }

  message.channel.send(output);
}
exports.desc = desc;
exports.execute = execute;
