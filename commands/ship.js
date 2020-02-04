const util = require(__basedir+"/util/util.js"),
      md5  = require("md5"),
      desc = "Ship anything and everything",
      args = "<thing1> <thing2>";

const execute = (message, command) => {
  var ship1 = command.getArgs()[0];
  var ship2 = command.getArgs()[1];
  if (command.getArgs().length != 2) {
    message.channel.send("You need to specify the ship");
    return;
  }
  var random = util.seededRand(ship1+ship2).toString().substring(3, 7); // Tested a few different parts of the seededRand outputs, this seems to be the most random (with a slight lean toward 0 of about 4%)

  message.channel.send(`\`${ship1}\` x \`${ship2}\`: **${random.substring(0,2)}.${random.substring(2,4)}%**`); // Give a grammatically correct (eight starts with vowel) answer
}

exports.args = args;
exports.desc = desc;
exports.execute = execute;
