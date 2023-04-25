import {InteractionType, SlashCommandStringOption } from "discord.js";
import { type CommandInteraction } from "discord.js";

const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ask')
    .setDescription('Ask a question across discord')
    .addStringOption((option: SlashCommandStringOption) => option.setName('question').setDescription('A Question').setRequired(true)),
  async execute(interaction: CommandInteraction){
    await interaction.reply(`**Question Asked**: ${interaction.options.get('question')?.value}`);
    

  }
}