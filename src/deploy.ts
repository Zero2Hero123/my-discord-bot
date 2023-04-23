require('dotenv').config();
console.log(process.env.CLIENT_ID)

const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const commands = [];

const cmdsPath = path.join(__dirname,'commands');
const commandFiles = fs.readdirSync(cmdsPath);

for(const cmdF of commandFiles){
  const cmdPath = path.join(cmdsPath,cmdF);

  const command = require(cmdPath);

  commands.push(command.data.toJSON());
  
}

const rest = new REST().setToken(process.env.TOKEN);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// put commands
		const data = await rest.put(
			Routes.applicationCommands(process.env.CLIENT_ID),
			{ body: commands }
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();