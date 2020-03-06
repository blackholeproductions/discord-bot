const util = require(__basedir+"/util/util.js"),
      md5  = require("md5"),
      desc = "Ship anything and everything",
      args = "<thing1> <thing2>";
// Same as ratewaifu, but instead of one its two, and instead of a rating out of 10 its a percentage.
const execute = (message, command) => {
  var embed = new Discord.RichEmbed();
  var ship1 = command.getArgs()[0];
  var ship2 = command.getArgs()[1];
  if (command.getArgs().length != 2) {
    message.channel.send("You need to specify the ship");
    return;
  }
  var random = util.seededRand(ship1+ship2, message.guild.id).toString().substring(3, 7);
  message.channel.send(`\`${ship1}\` x \`${ship2}\`: ${util.progressBar(parseInt(random)/100, 10   )} **${random.substring(0,2)}.${random.substring(2,4)}%**`);
}

exports.args = args;
exports.desc = desc;
exports.execute = execute;
