const util = require(__basedir+"/util/util.js"),
      md5  = require("md5"),
      desc = "Rate a waifu",
      args = "<waifu>";

const execute = (message, command) => {
  var waifu = command.getArgs()[0];
  if (command.getArgs().length != 1) {
    message.channel.send("You need to specifiy the waifu to rate.");
    return;
  }
  var random = parseInt(util.seededRand(waifu).toString().substring(4, 6)); // Tested a few different parts of the seededRand outputs, this seems to be the most random (with a slight lean toward 0 of about 4%)
  var zeroOrTen = function(value) {
    for (var i = 0, zero = false; i < 5; i++) { // For values 0-4 (5 values/10 total possible so equal chance of 0 and 10), set value to 0.
      if (value.toString().startsWith(i.toString())) zero = true;
    }
    if (zero) return 0; else return 10; // If not, set value to 10.
  }
  if (random.toString().endsWith("0")) random = zeroOrTen(random);
  if (random.toString().length > 1 && random != 10) random = random.toString().substring(1, 2); // If the value is not 10, only take the ending part so we have a single digit

  message.channel.send(`I would give \`${waifu}\` a${random === 8 ? "n" : ""} **${random}/10**`); // Give a grammatically correct (eight starts with vowel) answer
}

exports.args = args;
exports.desc = desc;
exports.execute = execute;
