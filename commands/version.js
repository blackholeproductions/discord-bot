const desc = "Get bot version";
const execute = (message, command) => {
  var data = util.json.JSONFromFile(`${__basedir}/data/bot/bot.json`);
  message.channel.send(`Current bot version is ${data.version} and was last updated on ${util.getDateFormatted(new Date(data.date))}`);
}
exports.desc = desc;
exports.execute = execute;
