const util = require(__basedir+"/util/util.js"),
      md5  = require("md5");
      desc = "Get the invite link for the bot";
const execute = (message, command) => {
  var embed = new Discord.MessageEmbed()
    .setDescription(`Here is your [invite link](https://discordapp.com/oauth2/authorize?client_id=672280373065154569&scope=bot&permissions=&permissions=271707190)`);
  message.channel.send(embed);
}
exports.desc = desc;
exports.execute = execute;
