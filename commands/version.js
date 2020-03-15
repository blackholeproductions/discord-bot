module.exports = {
  desc: "Get bot version",
  execute(message, command) {
    var data = util.json.JSONFromFile(`${__basedir}/data/bot/bot.json`);
    message.channel.send(`Current bot version is ${data.version} and was last updated on ${util.general.getDateFormatted(new Date(data.date))} UTC`);
  }
}
