import type { Events } from '@sapphire/framework';
import { Listener } from '@sapphire/framework';
import type { GuildBan } from 'discord.js';
import { embeds } from '../lib/embeds';
export class UserEvent extends Listener<typeof Events.GuildBanAdd> {
	public async run(member: GuildBan) {
		console.log('hi');
		const channel = await member.user.createDM();
		channel.send({ embeds: [embeds.dmBanEmbed] });
	}
}
