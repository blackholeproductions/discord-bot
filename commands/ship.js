const md5  = require("md5");
// Same as ratewaifu, but instead of one its two, and instead of a rating out of 10 its a percentage.
module.exports = {
  desc: "Ship anything and everything",
  args: "<thing1> <thing2>",
  execute(message, command) {
    var embed = new Discord.MessageEmbed();
    var ship1 = command.getArgs()[0].toLowerCase();
    var ship2 = command.getArgs()[1].toLowerCase();
    if (ship1.length+ship2.length+22 > 2000) {
      message.channel.send("Can't ship these, they're too fat. Sorry :(");
      return;
    }
    if (command.getArgs().length != 2) {
      message.channel.send("You need to specify the ship");
      return;
    }
    var random = util.general.seededRand(ship1+ship2, message.guild.id).toString().substring(3, 7);
    message.channel.send(`\`${command.getArgs()[0]}\` x \`${command.getArgs()[1]}\`: ${util.general.progressBar(parseInt(random)/100, 10)} **${random.substring(0,2)}.${random.substring(2,4)}%**`);
  }
}
