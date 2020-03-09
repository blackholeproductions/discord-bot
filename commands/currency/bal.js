const desc = "Gets user balance",
      args = "<user>";
const execute = (message, command) => {
  var user = message.mentions.users.first() || client.users.find("username", command.getArgs().join(" ")) || message.author;
  var currencyName = util.currency.getCurrencyName(message.guild.id, user.id) || "credit";
  var currencySymbol = util.currency.getCurrencySymbol(message.guild.id, user.id);
  var amount = util.currency.get(message.guild.id, message.author.id);
  message.channel.send(`*${user.username}* has ${util.currency.get(message.guild.id, user.id)}${currencySymbol ? currencySymbol : ` ${currencyName}`}${amount !== 1 && !currencySymbol ? "s" : ""}`);
}
exports.desc = desc;
exports.execute = execute;
