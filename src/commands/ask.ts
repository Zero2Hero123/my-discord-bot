import { Channel } from "diagnostics_channel";
import { SlashCommandStringOption, StringSelectMenuOptionBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Collection, GuildChannel, ChannelType } from "discord.js";
import { type CommandInteraction } from "discord.js";

const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ask')
    .setDescription('Ask a question across discord')
    .addStringOption((option: SlashCommandStringOption) => option.setName('question').setDescription('A Question').setRequired(true))
    .addStringOption((option: SlashCommandStringOption) => option.setName('subject').setDescription('What is your question generally about?').setRequired(true).addChoices({name: 'Web Development', value: 'webdev'},{name: 'Game Development', value: 'gamedev'},{name: 'Networking', value: 'networking'})),
  async execute(interaction: CommandInteraction) {
    
    // params passed by user
    const question = interaction.options.get('question')?.value;
    const subject = interaction.options.get('subject')?.value;
    

    const askEmbed = new EmbedBuilder() // embed confirming user's query
      .setDescription(`**Question Asked**: ${question}`)
      .setColor(0xffab2e)
      .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL()! })
      .setFooter({text: (subject as string)})


    const sendBtn1 = new ButtonBuilder() // send only to server btn
      .setCustomId('send-only')
      .setLabel('Send Here')
      .setStyle(ButtonStyle.Primary);
    const sendBtn2 = new ButtonBuilder() // send everywhere btn
      .setCustomId('send-everywhere')
      .setLabel('Send Everywhere')
      .setStyle(ButtonStyle.Primary);
    const cancelBtn = new ButtonBuilder() // cancel btn
      .setCustomId('cancel')
      .setLabel('Cancel')
      .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(sendBtn1, sendBtn2,cancelBtn);

    const res = await interaction.reply({ embeds: [askEmbed], components: [row], ephemeral: true });

    try {
      const click = await res.awaitMessageComponent({ filter: u => u.user.id === interaction.user.id })

      switch(click.customId){
        case 'send-only':
          await click.update({content: 'only here'})
          const channels = await interaction?.guild?.channels.fetch()
          const questionCategory: any = channels!.filter((c) => c?.name === 'Question Forum' || c?.name === 'question forum').at(0) ?? await interaction.guild?.channels.create({name: 'Question Forum', type: ChannelType.GuildCategory})    
          
          await interaction.guild?.channels.create({name: 'questions', type: ChannelType.GuildForum})
          
          break;
        case 'send-everywhere':
          await click.update({content: 'everywhere'})
          break;
        case 'cancel':
          await click.update({content: '*Canceled*', components: []})
          break;
      }
      
    } catch (err) {
      await interaction.editReply({ content: `error: ${err}` })
    }


  }
}