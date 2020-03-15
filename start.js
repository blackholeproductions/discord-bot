const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.question('Enter start message: ', (startmsg) => {
  var bot = require('./bot.js');
  bot.startmsg = startmsg;
  bot.execute(startmsg);
  rl.close();
});
