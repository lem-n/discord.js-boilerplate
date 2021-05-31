const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'help', // Command name (what's gonna be used to call the command)
  aliases: ['commands'], // Command aliases

  execute(client, message) {
    // Create a string with all commands sepearated by ','.
    const commandString = client.commands.map((c) => `\`${c.name}\``).join();
    const embed = new MessageEmbed()
      .setTitle('Commands')
      .setColor('RANDOM')
      .setDescription(commandString);

    message.channel.send({ embed });
  },
};
