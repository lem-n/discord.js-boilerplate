const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'stats', // Command name (what's gonna be used to call the command)

  execute(client, message) {
    // Construct info embed
    const embed = new MessageEmbed()
      .setTitle('About')
      .setColor('RANDOM')
      .setDescription('Stats about this bot')
      .addField('Created', client.user.createdAt)
      .addField(
        'Heap Usage',
        `${Math.round(process.memoryUsage().heapUsed / 1048576)}mb`,
        true
      ) // 1048576 = size of an mb in bytes
      .addField('Uptime', formatTime(process.uptime()), true)
      .setFooter('Discord Example Bot', client.user.displayAvatarURL);

    message.channel.send({ embed });
  },
};

function formatTime(milliseconds) {
  const secNum = parseInt(milliseconds, 10);
  let hours = Math.floor(secNum / 3600);
  let minutes = Math.floor((secNum - hours * 3600) / 60);
  let seconds = secNum - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  const time = `${hours}:${minutes}:${seconds}`;
  return time;
}
