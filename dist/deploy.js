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
require('dotenv').config();
console.log(process.env.CLIENT_ID);
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const commands = [];
const cmdsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(cmdsPath);
for (const cmdF of commandFiles) {
    const cmdPath = path.join(cmdsPath, cmdF);
    const command = require(cmdPath);
    commands.push(command.data.toJSON());
}
const rest = new REST().setToken(process.env.TOKEN);
// and deploy your commands!
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);
        // put commands
        const data = yield rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    }
    catch (error) {
        console.error(error);
    }
}))();
