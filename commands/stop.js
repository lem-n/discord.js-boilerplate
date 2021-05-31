module.exports = {
  name: 'stop',
  execute(client, message) {
    const connection = message.guild.me.voice.connection;
    if (!connection) {
      message.reply("I'm not in a voice channel...");
      return;
    }
    connection.disconnect();
    message.channel.send('Bye bye');
  },
};
