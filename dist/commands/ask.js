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
const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ask')
        .setDescription('Ask a question across discord')
        .addStringOption((option) => option.setName('question').setDescription('A Question').setRequired(true)),
    execute(interaction) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const askEmbed = new discord_js_1.EmbedBuilder()
                .setDescription(`**Question Asked**: ${(_a = interaction.options.get('question')) === null || _a === void 0 ? void 0 : _a.value}`)
                .setColor(0xffab2e)
                .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL() });
            const sendBtn1 = new discord_js_1.ButtonBuilder()
                .setCustomId('send-only')
                .setLabel('Send Here')
                .setStyle(discord_js_1.ButtonStyle.Primary);
            const sendBtn2 = new discord_js_1.ButtonBuilder()
                .setCustomId('send-everywhere')
                .setLabel('Send Everywhere')
                .setStyle(discord_js_1.ButtonStyle.Primary);
            const row = new discord_js_1.ActionRowBuilder().addComponents(sendBtn1, sendBtn2);
            yield interaction.reply({ embeds: [askEmbed], components: [row], ephemeral: true });
        });
    }
};
