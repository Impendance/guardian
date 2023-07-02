import { ApplyOptions } from '@sapphire/decorators';
import { InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework';
import type { ModalSubmitInteraction } from 'discord.js';
import { customID } from '../../lib/custom-id';
import { embeds } from '../../lib/embeds';

@ApplyOptions<InteractionHandler.Options>({
	interactionHandlerType: InteractionHandlerTypes.ModalSubmit
})
export class ModalHandler extends InteractionHandler {
	public async run(interaction: ModalSubmitInteraction) {
		await interaction.reply({
			content: 'Are you sure you want to mute these members?',
			ephemeral: true,
			embeds: [embeds.confirmMutePreviewEmbed()]
		}
		);
	}

	public override parse(interaction: ModalSubmitInteraction) {
		if (interaction.customId !== customID.muteModal) return this.none();

		return this.some();
	}
}
