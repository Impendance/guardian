import { baseEmbed, logBaseEmbed } from './constants';

export const embeds = {
	dmMuteEmbed: baseEmbed.setTitle('You have been muted in the server'),
	dmUnmuteEmbed: baseEmbed.setTitle('You have been unmuted in the server'),
	logsMuteEmbed: logBaseEmbed.setTitle('username'),
	logsUnmuteEmbed: logBaseEmbed.setTitle('username'),
	dmBanEmbed: logBaseEmbed.setTitle('You have been banned in the server'),
	dmUnbanEmbed: logBaseEmbed.setTitle('You have been unbanned in the server')
};
