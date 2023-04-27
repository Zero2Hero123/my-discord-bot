import { SlashCommandStringOption, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ButtonComponent } from "discord.js";
import { type CommandInteraction } from "discord.js";

const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ask')
    .setDescription('Ask a question across discord')
    .addStringOption((option: SlashCommandStringOption) => option.setName('question').setDescription('A Question').setRequired(true)),
  async execute(interaction: CommandInteraction){

    const askEmbed = new EmbedBuilder() // embed confirming user's query
      .setDescription(`**Question Asked**: ${interaction.options.get('question')?.value}`)
      .setColor(0xffab2e)
      .setAuthor({name: interaction.user.tag, iconURL: interaction.user.avatarURL()!})


    const sendBtn1 = new ButtonBuilder() // send only to server btn
      .setCustomId('send-only')
      .setLabel('Send Here')
      .setStyle(ButtonStyle.Primary);
    const sendBtn2 = new ButtonBuilder() // send everywhere btn
      .setCustomId('send-everywhere')
      .setLabel('Send Everywhere')
      .setStyle(ButtonStyle.Primary);
    
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(sendBtn1,sendBtn2);
    
    const res = await interaction.reply({ embeds: [askEmbed], components: [row], ephemeral: true });

    await res.awaitMessageComponent({ filter: u => u.user.id === interaction.user.id })
    
    
  }
}