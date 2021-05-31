const { Client, Collection } = require('discord.js');
const path = require('path');
const glob = require('glob');

const config = require('./config.json');
const client = new Client();

// Create two Collections where we can store our commands and aliases in.
// Store these collections on the client object so we can access them inside commands etc.
client.commands = new Collection();
client.aliases = new Collection();

function loadCommands(commandDirectoryPath) {
  // Create an empty array that will store all the file paths for the commands,
  // and push all files to the array.
  const commandArray = [];
  commandArray.push(
    ...glob.sync(`${path.join(__dirname, commandDirectoryPath)}/**/*.js`)
  );

  // Iterate through each element of the items array and add the commands / aliases
  // to their respective Collection.
  for (const commandItem of commandArray) {
    // Remove any cached commands
    if (require.cache[require.resolve(commandItem)])
      delete require.cache[require.resolve(commandItem)];

    // Store the command and aliases (if it has any) in their Collection.
    const command = require(commandItem);

    // Check if this command has some precondition that should prevent it from being loaded
    if ('shouldLoad' in command && !command.shouldLoad()) continue;

    // Add command to our commands collection and map aliases
    client.commands.set(command.name, command);
    if (command.aliases) {
      for (const alias of command.aliases) {
        client.aliases.set(alias, command.name);
      }
    }
  }
  console.log('Commands was loaded...');
}

// Load commands from the './commands' folder
loadCommands('commands');

client
  .on('ready', () => {
    console.log('Bot is ready...');
  })
  // Client message event, contains the logic for the command handler.
  .on('message', (message) => {
    // Make sure the message contains the command prefix from the config.json.
    if (!message.content.startsWith(config.prefix)) return;
    // Make sure the message author isn't a bot
    if (message.author.bot) return;
    // Make sure the channel the command is called in is a text channel.
    if (message.channel.type !== 'text') return;

    // Split the message content and store the command called, and the args.
    const messageSplit = message.content.split(/\s+/g);
    const cmd = messageSplit[0].slice(config.prefix.length);
    const args = messageSplit.slice(1);

    try {
      // Check if the command called exists in either the commands Collection
      // or the aliases Collection.
      let command;
      if (client.commands.has(cmd)) {
        command = client.commands.get(cmd);
      } else if (client.aliases.has(cmd)) {
        command = client.commands.get(client.aliases.get(cmd));
      }

      // Make sure command is defined.
      if (!command) return;

      // If the command exists then run the execute function inside the command file.
      command.execute(client, message, args);
    } catch (err) {
      console.error(err);
    }
  });

client.login(config.token);
