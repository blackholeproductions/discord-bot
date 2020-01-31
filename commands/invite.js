const util = require(__basedir+"/util/util.js"),
      md5  = require("md5");
      desc = "Get the invite link for the bot";
const execute = (message, command) => {
  message.channel.send(`${message.author.tag} Here is your invite link: https://discordapp.com/oauth2/authorize?client_id=672280373065154569&scope=bot&permissions=8`);
}
exports.desc = desc;
exports.execute = execute;
