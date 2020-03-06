const desc = "Add guild to trusted guild list"
      admin = true;
const execute = (message, command) => {
  util.xp.addTrusted(message.guild.id);
  message.channel.send("Added to trusted guild list");
}

exports.admin = admin;
exports.desc = desc;
exports.execute = execute;
