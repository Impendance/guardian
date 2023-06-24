import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';

@ApplyOptions<Command.Options>({
	description: 'A basic slash command'
})
export class UserCommand extends Command {
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) =>
			builder //
				.setName(this.name)
				.setDescription(this.description)
				.addUserOption((option) => option.setName('user').setDescription('The user to unban').setRequired(true))
				.addStringOption((option) => option.setName('reason').setDescription('The reason for unbanning the user'))
				.addBooleanOption((option) => option.setName('ephemeral').setDescription('Whether to make the res'))
		);
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		const bannedUser = interaction.options.getUser('member', true);
		const reason = interaction.options.getString('reason', false);
		const ephemeral = interaction.options.getBoolean('ephemeral', false);
		interaction.guild?.members.unban(bannedUser, reason ?? undefined);
		interaction.reply({ content: 'User unbanned!', ephemeral: ephemeral ?? true });
	}
}
