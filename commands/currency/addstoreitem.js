module.exports = {
  desc: "Add an item to your server's store",
  args: "<price> 'item name' <type> \"description\" <optional:roleID>",
  ex: "Refer to the tutorial of this module",
  execute(message, command) {
    var price = command.getArgs()[0];
    if (isNaN(price)) {
      message.channel.send("Invalid price");
      return;
    }
    var itemName = command.getArgs().join(' ').split("'")[1];
    var type = command.getArgs().join(' ').split("'")[2].split('"')[0].replace(/ /g, "");
    var description = command.getArgs().join(' ').split('"')[1];
    if (type == 'role') {
      var roleID = command.getArgs().join(' ').split('"')[2].replace(/ /g, "");
      if (message.mentions.roles.first() !== undefined) roleID = message.mentions.roles.first().id;
      if (!message.guild.roles.cache.has(roleID)) {
        message.channel.send(roleID);
        message.channel.send("Invalid role");
        return;
      }
      message.channel.send(util.currency.addStoreItem(message.guild.id, price, itemName, type, description, { roleID: roleID }));
    } else {
      message.channel.send(util.currency.addStoreItem(message.guild.id, price, itemName, type, description));
    }

  }
}
