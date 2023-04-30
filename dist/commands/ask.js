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
        .addStringOption((option) => option.setName('question').setDescription('A Question').setRequired(true))
        .addStringOption((option) => option.setName('subject').setDescription('What is your question generally about?').setRequired(true).addChoices({ name: 'Web Development', value: 'webdev' }, { name: 'Game Development', value: 'gamedev' }, { name: 'Networking', value: 'networking' })),
    execute(interaction) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            // params passed by user
            const question = (_a = interaction.options.get('question')) === null || _a === void 0 ? void 0 : _a.value;
            const subject = (_b = interaction.options.get('subject')) === null || _b === void 0 ? void 0 : _b.value;
            const askEmbed = new discord_js_1.EmbedBuilder() // embed confirming user's query
                .setDescription(`**Question Asked**: ${question}`)
                .setColor(0xffab2e)
                .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL() })
                .setFooter({ text: subject });
            const sendBtn1 = new discord_js_1.ButtonBuilder() // send only to server btn
                .setCustomId('send-only')
                .setLabel('Send Here')
                .setStyle(discord_js_1.ButtonStyle.Primary);
            const sendBtn2 = new discord_js_1.ButtonBuilder() // send everywhere btn
                .setCustomId('send-everywhere')
                .setLabel('Send Everywhere')
                .setStyle(discord_js_1.ButtonStyle.Primary);
            const cancelBtn = new discord_js_1.ButtonBuilder() // cancel btn
                .setCustomId('cancel')
                .setLabel('Cancel')
                .setStyle(discord_js_1.ButtonStyle.Secondary);
            const row = new discord_js_1.ActionRowBuilder().addComponents(sendBtn1, sendBtn2, cancelBtn);
            const res = yield interaction.reply({ embeds: [askEmbed], components: [row], ephemeral: true });
            try {
                const click = yield res.awaitMessageComponent({ filter: u => u.user.id === interaction.user.id });
                switch (click.customId) {
                    case 'send-only':
                        yield click.update({ content: 'only here' });
                        const channels = yield ((_c = interaction === null || interaction === void 0 ? void 0 : interaction.guild) === null || _c === void 0 ? void 0 : _c.channels.fetch());
                        const questionCategory = channels.filter((c) => c.name === 'Questions').at(0);
                        console.log(questionCategory);
                        break;
                    case 'send-everywhere':
                        yield click.update({ content: 'everywhere' });
                        break;
                    case 'cancel':
                        yield click.update({ content: '*Canceled*', components: [] });
                        break;
                }
            }
            catch (err) {
                yield interaction.editReply({ content: `error: ${err}` });
            }
        });
    }
};
