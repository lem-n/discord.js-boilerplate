# Discord Bot Example

## Dependencies

- Node.js 14.0.0 or higher
- FFmpeg
- An audio engine ([@discordjs/opus](https://www.npmjs.com/package/@discordjs/opus) or [opusscript](https://www.npmjs.com/package/opusscript))

## Running

1. Clone the repository `git clone https://github.com/lem-n/discord.js-boilerplate.git`.
2. Open the project in your terminal e.g `cd C:\Projects\discord.js-boilerplate-master`, and run: `npm install` to install dependencies from the package.json.

**NOTE:** To install `@discord/opus` you need to have [build tools](https://www.npmjs.com/package/windows-build-tools) installed (You can install them with: `npm install -g windows-build-tools`). You will also need to have the [FFmpeg](https://www.ffmpeg.org/download.html) binaries and have them added to your environment PATH.

If you have all you need installed you should just be able to open a terminal in your project directory and run `npm start` or `node bot.js` and it should start the bot.
