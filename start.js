const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.question('Lemme test: ', (startmsg) => {
  var bot = require('./bot.js');
  bot.startmsg = startmsg;
  bot.execute(startmsg);
  rl.close();
});
