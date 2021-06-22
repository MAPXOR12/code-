client.on("message", function(niro_games) {
  if (niro_games.content.startsWith(PREFIX  + "rps")) {
    let messageArgs = niro_games.content
      .split(" ")
      .slice(1)
      .join(" ");
    let messageRPS = niro_games.content
      .split(" ")
      .slice(2)
      .join(" ");
    let arrayRPS = ["**# - Rock**", "**# - Paper**", "**# - Scissors**"];
    let result = `${arrayRPS[Math.floor(Math.random() * arrayRPS.length)]}`;
    var RpsEmbed = new Discord.MessageEmbed()
      .setAuthor(niro_games.author.username)
      .setThumbnail(niro_games.author.avatarURL())
      .addField("Rock", "🇷", true)
      .addField("Paper", "🇵", true)
      .addField("Scissors", "🇸", true);
    niro_games.reply(RpsEmbed).then(msg => {
      msg.react("🇸");
      msg.react("🇷");
      msg.react("🇵")
        .then(() => msg.react("🇸"))
        .then(() => msg.react("🇷"))
        .then(() => msg.react("🇵"));
      let reaction1Filter = (reaction, user) =>
        reaction.emoji.name === "🇸" && user.id === niro_games.author.id;
      let reaction2Filter = (reaction, user) =>
        reaction.emoji.name === "🇷" && user.id === niro_games.author.id;
      let reaction3Filter = (reaction, user) =>
        reaction.emoji.name === "🇵" && user.id === niro_games.author.id;
      let reaction1 = msg.createReactionCollector(reaction1Filter, {
        time: 12000
      });

      let reaction2 = msg.createReactionCollector(reaction2Filter, {
        time: 12000
      });
      let reaction3 = msg.createReactionCollector(reaction3Filter, {
        time: 12000
      });
      reaction1.on("collect", r => {
        niro_games.reply(result);
      });
      reaction2.on("collect", r => {
        niro_games.reply(result);
      });
      reaction3.on("collect", r => {
        niro_games.reply(result);
      });
    });
  }
});
