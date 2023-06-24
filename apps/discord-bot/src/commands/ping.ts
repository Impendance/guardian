import { Command } from '@sapphire/framework';
import { SlashCommandBooleanOption, SlashCommandBuilder } from 'discord.js';
import i18next from 'i18next';

export class UserCommand extends Command {
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand(
			new SlashCommandBuilder()
				.setName('ping')
				.setDescription('Check the latency of the bot.')
				.addBooleanOption(
					new SlashCommandBooleanOption().setName('hide').setDescription('Whether the response should be ephemeral.').setRequired(false)
				),
			{
				guildIds: [process.env.GUILD_ID!],
				idHints: ['1122089560390782996']
			}
		);
	}

	public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		return this.sendPing(interaction);
	}
	private async sendPing(interaction: Command.ChatInputCommandInteraction) {
		const reply = await interaction.deferReply({
			ephemeral: interaction.options.getBoolean('hide') ?? true,
			fetchReply: true
		});
		const content = i18next.t('command.common.ping.response', {
			lng: 'en-US',
			bot_latency: Math.round(this.container.client.ws.ping),
			api_latency: reply.createdTimestamp - interaction.createdTimestamp
		});

		return interaction.editReply({
			content: content
		});
	}
}
