const GoogleImages = require('google-images');
const client = new GoogleImages(config.googleSearchKey, config.googleApiKey);
module.exports = {
  desc: "Searches an image on Google Images (likely won't work, this is rate limited heavily)",
  args: "<search>",
  execute(message, command) {
    var search = command.getArgs().join(" ");
    client.search(search)
        .then(images => {
          var url = images[util.general.generateRandomNumber(0, images.length-1)].url;
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
}
