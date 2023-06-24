import type { Events } from '@sapphire/framework';
import { Listener } from '@sapphire/framework';
import type { GuildMember } from 'discord.js';
import { embeds } from '../lib/embeds';
export class UserEvent extends Listener<typeof Events.GuildMemberUpdate> {
	public async run(oldMember: GuildMember, newMember: GuildMember) {
		if (oldMember.isCommunicationDisabled() !== newMember.isCommunicationDisabled()) {
			const channel = await newMember.createDM();
			if (newMember.isCommunicationDisabled()) {
				await channel.send({ embeds: [embeds.dmMuteEmbed] });
			} else {
				await channel.send({ embeds: [embeds.dmUnmuteEmbed] });
			}
		}
	}
}
