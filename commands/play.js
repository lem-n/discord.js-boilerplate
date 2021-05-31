const path = require('path');
const { truncateStr } = require('../helpers.js');

module.exports = {
  name: 'play', // Command name (what's gonna be used to call the command)
  aliases: ['playFile'],
  // Function the do prechecks before loading the command
  shouldLoad() {
    // Check modules
    try {
      const resolved = require.resolve('@discordjs/opus');
      console.log('Found audio lib:', resolved);
      return true;
    } catch (err) {
      console.error('> "@discordjs/opus" is not installed.');
      try {
        const resolved = require.resolve('opusscript');
        console.log('Found audio lib:', resolved);
        return true;
      } catch (err2) {
        console.error('> "opusscript" is not installed.');
        return false;
      }
    }
  },
  // This command requires you to have '@discordjs/opus' or 'opusscript' installed in order to work.
  // The first lines (10 - 20) are just to make sure it's not executed if any of those aren't installed.
  async execute(client, message) {
    // Get members current active voice channel.
    const voiceChannel = message.member.voice.channel;
    // Make sure the voice channel is actually defined (aka, they're inside a voice channel).
    if (!voiceChannel)
      return message.reply('You must be in a voice channel first.');
    // We now know the voice channel is defiend, so let's join them.
    // We also store the connection returned from joining the voice channel.
    if (!voiceChannel.joinable) {
      message.reply('Cannot join your current voice channel');
      return;
    }

    try {
      const connection = await voiceChannel.join();
      message.guild.me.voice.setSelfDeaf(true);
      // We can use the connection to play the file.
      const filepath = path.resolve(__dirname, '../assets/Rival.mp3');
      const dispatcher = await connection.play(filepath, { volume: 0.5 });
      console.log('Playing audio file:', filepath);
      // We'll use the dispatcher returned from playing a stream to leave the voice channel
      // once the song is done playing.
      dispatcher
        .on('end', () => {
          message.channel.send("Song ended so I'm leaving.");
          voiceChannel.leave();
        }) // Log any stream errors that might occurr.
        .on('error', (err) => {
          voiceChannel.leave();
          message.channel.send(
            `Something went wrong while playing song: \`${truncateStr(
              err.message,
              2000
            )}\``
          );
          console.error(err);
        });
    } catch (err) {
      voiceChannel.leave();
      message.channel.send(
        `Something went wrong while playing song: \`${truncateStr(
          err.message,
          2000
        )}\``
      );
      console.error(err);
    }
  },
};
