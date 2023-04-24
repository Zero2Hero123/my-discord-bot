"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
require('dotenv').config();
const path = require('path');
const fs = require('fs');
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const client = new Client({ intents: GatewayIntentBits.Guilds });
client.commands = new Collection();
// add all the commands to client.commands
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath);
commandFiles.forEach((f) => {
    const filePath = path.join(commandsPath, f);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
});
// ...
// when bot is ready
client.once(Events.ClientReady, (c) => {
    console.log(`${c.user.tag} is online!`);
    client.user.setActivity({ name: 'hero code', type: discord_js_1.ActivityType.Watching });
});
client.on(Events.InteractionCreate, (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command)
            return;
        try {
            yield command.execute(interaction);
        }
        catch (err) {
            console.error(err);
            if (interaction.replied || interaction.deferred) {
                yield interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            }
            else {
                yield interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    }
}));
// startup the bot
client.login(process.env.TOKEN);
