import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { SlashCommandBooleanOption, SlashCommandBuilder } from 'discord.js';
@ApplyOptions<Command.Options>({
	description: 'Check the latency of the bot.'
})
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
		const content = `Pong! Bot Latency ${Math.round(this.container.client.ws.ping)}ms. API Latency ${
			reply.createdTimestamp - interaction.createdTimestamp
		}ms.`;

		return interaction.editReply({
			content: content
		});
	}
}
