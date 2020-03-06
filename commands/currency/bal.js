const desc = "Gets user balance",
      args = "<user>";
const execute = (message, command) => {
  if (command.getArgs().length > 0) {
    var user = message.mentions.users.first() || client.users.find("username", command.getArgs().join(" "));
    if (user != undefined) {
      var currencyname = util.currency.getCurrencyName(message.guild.id, user.id) || "credits";
      var currencysymbol = util.currency.getCurrencySymbol(message.guild.id, user.id);
      message.channel.send(`*${user.username}* has ${util.currency.get(message.guild.id, user.id)} ${currencysymbol ? currencysymbol : currencyname}`);
    }
  } else {
    var currencyname = util.currency.getCurrencyName(message.guild.id, message.author.id) || "credits";
    var currencysymbol = util.currency.getCurrencySymbol(message.guild.id, message.author.id);
    message.channel.send(`You have ${util.currency.get(message.guild.id, message.author.id)} ${currencysymbol ? currencysymbol : currencyname}`);
  }
}
exports.desc = desc;
exports.execute = execute;
