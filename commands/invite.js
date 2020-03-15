const md5  = require("md5");
module.exports = {
  desc: "Get the invite link for the bot",
  execute(message, command) {
    var embed = new Discord.MessageEmbed()
      .setDescription(`Here is your [invite link](https://discordapp.com/oauth2/authorize?client_id=672280373065154569&scope=bot&permissions=&permissions=271707190)`);
    message.channel.send(embed);
  }
}
