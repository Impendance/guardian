import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { ActionRowBuilder, UserSelectMenuBuilder } from 'discord.js';
import { customID } from '../lib/custom-id';

@ApplyOptions<Command.Options>({
	description: 'mute command'
})
export class UserCommand extends Command {
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand(
			(builder) =>
				builder //
					.setName(this.name)
					.setDescription(this.description)
					.addSubcommand((subcommand) =>
						subcommand
							.setName('single')
							.setDescription('Mute a single user')
							.addUserOption((option) => option.setName('user').setDescription('User to mute').setRequired(true))
							.addNumberOption((option) => option.setName('duration').setDescription('Time for mute').setRequired(true))
							.addStringOption((option) =>
								option
									.setName('unit')
									.setDescription('the unit of the duration')
									.setRequired(true)
									.addChoices(
										{ name: 'seconds', value: 'seconds' },
										{ name: 'minutes', value: 'minutes' },
										{ name: 'hours', value: 'hours' },
										{ name: 'days', value: 'days' },
										{ name: 'years', value: 'years' }
									)
							)
					)
					.addSubcommand((subcommand) => subcommand.setName('multiple').setDescription('Mute multiple users')),
			{
				guildIds: [process.env.GUILD_ID!]
			}
		);
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		if (interaction.options.getSubcommand() === 'single') {
			const duration = interaction.options.getNumber('duration');
			const unit = interaction.options.getString('unit');
			const user = interaction.options.getUser('user');
			return interaction.reply({ content: `muted ${user} for ${duration} ${unit}`, ephemeral: true });
		} else {
			const row = new ActionRowBuilder<UserSelectMenuBuilder>().addComponents(
				new UserSelectMenuBuilder()
					.setCustomId(customID.muteSelectMenu)
					.setPlaceholder('Select users to mute')
					.setMinValues(1)
					.setMaxValues(5)
			);
			return interaction.reply({ content: 'select multiple users', components: [row], ephemeral: true });
		}
	}
}
