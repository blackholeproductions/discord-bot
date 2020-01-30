const util = require("./util/util.js"),
      md5  = require("md5");
// from old bot, maybe rewrite later (now partially rewritten)
const execute = (message, command) => {
  if (command.getArgs().length == 1) {
    var denominator = 10; // What to rate out of (currently 8/10)
    var waifu = command.getArgs()[0]; 
    
    //positively FUCK it into a number. maybe put it in a function later for positively fucking other numbers with relative ease
    var ship = util.hashCode(md5(util.hashCode(util.hashCode(waifu.toLowerCase(), 5812).toString()))).toString(); 
    var shipd = util.hashCode(ship).toString();
    
    var shipPercentA = ship.substring(ship.length - 3, ship.length - 1); // Get the rating from the giant number
    // no idea what this does but i'm pretty sure it makes it 6/9 sometimes or something. dunno.
    if (parseInt(shipd.substring(0, 1)) == 5 && parseInt(shipPercentA) == 6) {
      denominator = 9;
    }
    if (shipPercentA !== "10") shipPercentA = ship.substring(ship.length - 2, ship.length - 1);
    console.log(waifu + " got a " + shipPercentA + "/" + denominator);
    if (shipPercentA !== "8") message.channel.send("i would give `" + command.getArgs()[0] + "` a **" + shipPercentA + "/" + denominator + "**");
    if (shipPercentA == "8") message.channel.send("i would give `" + command.getArgs()[0] + "` an **" + shipPercentA + "/" + denominator + "**");
  }
}

exports.execute = execute;
