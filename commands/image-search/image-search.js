const GoogleImages = require('google-images');

const client = new GoogleImages(config.googleSearchKey, config.googleApiKey);

const desc = "Just a module test command";
const execute = (message, command) => {
  var search = command.getArgs().join(" ");
  client.search(search)
      .then(images => {
        var url = images[util.generateRandomNumber(0, images.length-1)].url;
        if (url.endsWith(".png") || url.endsWith(".jpg") || url.endsWith(".jpeg")) {
          message.channel.send(`Here is your ${search}`, { files: [`${url}`] });
        } else {
          message.channel.send(`Here is your ${search}: ${url}`);
        }
      })
      .catch(function(error) {
        message.channel.send("Could not get image - " + error);
      });

}
exports.desc = desc;
exports.execute = execute;
