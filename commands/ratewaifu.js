const util = require("./util/util.js"),
      md5  = require("md5");
// from old bot, maybe rewrite later
const execute = (message, command) => {
  if (command.getArgs().length == 1) {
    var shipVal = 0;
    var denominator = 10;
    var myniggas = command.getArgs()[0]; // WHY THE HELL DID PAST ME NAME THIS VARIABLE THIS
    var shipa = util.hashCode(myniggas.toLowerCase(), 5812).toString();
    var shipb = util.hashCode(shipa);
    var shipc = md5(shipb);
    var ship = util.hashCode(shipc).toString();
    var shipd = util.hashCode(ship).toString();

    var shipPercentA = ship.substring(ship.length - 3, ship.length - 1);
    if (parseInt(shipd.substring(0, 1)) == 5 && parseInt(shipPercentA) == 6) {
      denominator = 9;
    }
    if (shipPercentA !== "10") shipPercentA = ship.substring(ship.length - 2, ship.length - 1);
    console.log(myniggas + " got a " + shipPercentA + "/" + denominator);
    if (shipPercentA !== "8") message.channel.send("i would give `" + command.getArgs()[0] + "` a **" + shipPercentA + "/" + denominator + "**");
    if (shipPercentA == "8") message.channel.send("i would give `" + command.getArgs()[0] + "` an **" + shipPercentA + "/" + denominator + "**");
  }
}

exports.execute = execute;
