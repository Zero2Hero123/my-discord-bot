import { ActivityType, BaseInteraction } from "discord.js";

require('dotenv').config()
const path = require('path')
const fs = require('fs')

const {Client, Events, GatewayIntentBits, Collection} = require('discord.js')

const client = new Client({intents: GatewayIntentBits.Guilds})
client.commands = new Collection();

// add all the commands to client.commands
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath);

commandFiles.forEach((f: string) => {
  const filePath = path.join(commandsPath, f);
	const command = require(filePath);
  client.commands.set(command.data.name, command);
})
// ...

// when bot is ready
client.once(Events.ClientReady, (c: typeof Client) => {
  console.log(`${c.user.tag} is online!`)

  client.user.setActivity({name: 'hero code', type: ActivityType.Watching})
})

client.on(Events.InteractionCreate, async (interaction: BaseInteraction) => {

  if(interaction.isCommand()){
    const command = client.commands.get(interaction.commandName)

    if(!command) return;

    try {
      await command.execute(interaction)
    } catch (err){
      console.error(err)
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
  		} else {
  			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  		}
    }
  }
  
})

// startup the bot
client.login(process.env.TOKEN)