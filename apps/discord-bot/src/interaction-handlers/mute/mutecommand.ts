import { ApplyOptions } from '@sapphire/decorators';
import { InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework';
import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, type UserSelectMenuInteraction } from 'discord.js';
import { customID } from '../../lib/custom-id';
@ApplyOptions<InteractionHandler.Options>({
	interactionHandlerType: InteractionHandlerTypes.SelectMenu
})
export class MenuHandler extends InteractionHandler {
	public override async run(interaction: UserSelectMenuInteraction) {
		let array = ['10m, spamming', '10sec, being nonsense', '10hrs, inappropriate', '28 days, max time for a timeout'];
		let i: number = -1;
		const textInputs = interaction.values.map((userId) => {
			i = i + 1;
			return new TextInputBuilder()
				.setCustomId(customID.textInputFields[i])
				.setPlaceholder(`<time>, <reason>`)
				.setValue(array[i])
				.setStyle(TextInputStyle.Paragraph)
				.setLabel(interaction.guild!.members.cache.get(userId)?.user.username!);
		});
		const actionRows = textInputs.map((textInput) => {
			return new ActionRowBuilder<TextInputBuilder>().addComponents(textInput);
		});
		const modal = new ModalBuilder()
			.setTitle(`Mute ${interaction.values.length} members`)
			.setCustomId(customID.muteModal)
			.addComponents(...actionRows);

		await interaction.showModal(modal);
	}

	public override parse(interaction: UserSelectMenuInteraction) {
		return interaction?.customId === customID.muteSelectMenu ? this.some() : this.none();
	}
}
