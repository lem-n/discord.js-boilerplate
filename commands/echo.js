/**
 * @author lemn
 * @year 2021
 */

module.exports = {
  name: 'echo', // Command name (what's gonna be used to call the command)
  aliases: ['say', 'repeat'], // Command aliases

  execute(client, message, args) {
    // Send a message with the text the user entered after the command.
    // If they didn't pass any args we send a :thinking:
    message.channel.send(
      `> ${args.length !== 0 ? args.join(' ') : ':thinking:'}`
    );
  },
};
