const mathjs = require('mathjs');
module.exports = {
  desc: "Rationalizes a math expression",
  args: "<expression>",
  aliases: ["rtz"],
  execute(message, command) {
    var evaluation;
    try {
      evaluation = mathjs.rationalize(command.getArgs().join(' '));
    } catch(err) {
      message.channel.send("There was an error calculating your expression.");
      return;
    }
    if (!evaluation) return;
    if (command.getArgs().join(' ').length+evaluation.toString().length+3 > 2000) {
      message.channel.send("Unable to process, too big");
      return;
    }
    message.channel.send(`${command.getArgs().join(' ')} = ${evaluation}`);
  }
}
