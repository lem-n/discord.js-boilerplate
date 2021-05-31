module.exports = {
  name: 'ping', // Command name (what's gonna be used to call the command)
  aliases: ['latency'], // Command aliases

  execute(client, message) {
    message.channel.send('Pinging...').then((sentMsg) => {
      sentMsg.edit(
        `:ping_pong: Pong! Took \`${
          sentMsg.createdTimestamp - message.createdTimestamp
        }ms\``
      );
    });
  },
};
