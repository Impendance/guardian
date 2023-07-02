import { Command } from '@sapphire/framework';
import { resolveKey } from '@sapphire/plugin-i18next';
import { SlashCommandBooleanOption, SlashCommandBuilder } from 'discord.js';
import '../languages/en-US/commands/ping.json';
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
				guildIds: [process.env.GUILD_ID!]
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
		const content = await resolveKey(interaction, 'commands/ping:success', {
			api_latency: reply.createdTimestamp - interaction.createdTimestamp
		});

		return interaction.editReply({
			content
		});
	}
}
