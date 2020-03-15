module.exports = {
  desc: "Sets the seed of the server",
  args: "<seed>",
  execute(message, command) {
    if (command.getArgs().length != 1) {
      message.channel.send("You must provide a seed for me to set it to.");
      return;
    }
    if (message.member.hasPermission("MANAGE_GUILD")) {
      var seed = command.getArgs()[0];
      util.general.setSeed(message.guild.id, seed);
      message.channel.send(`Set seed to ${seed}`);
    } else {
      message.channel.send('You do not have sufficient permissions. (Need "Manage Server" Permission)');
    }
  }
}
