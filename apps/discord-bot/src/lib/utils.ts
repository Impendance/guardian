import {
	container,
	type ChatInputCommandSuccessPayload,
	type Command,
	type ContextMenuCommandSuccessPayload,
	type MessageCommandSuccessPayload
} from '@sapphire/framework';
import { cyan } from 'colorette';
import moment from 'moment';
import type { APIUser, Guild, User } from 'discord.js';

export function logSuccessCommand(payload: ContextMenuCommandSuccessPayload | ChatInputCommandSuccessPayload | MessageCommandSuccessPayload): void {
	let successLoggerData: ReturnType<typeof getSuccessLoggerData>;

	if ('interaction' in payload) {
		successLoggerData = getSuccessLoggerData(payload.interaction.guild, payload.interaction.user, payload.command);
	} else {
		successLoggerData = getSuccessLoggerData(payload.message.guild, payload.message.author, payload.command);
	}

	container.logger.debug(`${successLoggerData.shard} - ${successLoggerData.commandName} ${successLoggerData.author} ${successLoggerData.sentAt}`);
}

export function parseTime(input: string): moment.Duration | null {
	const regex = /^(\d+)\s*(s|sec|second|seconds|m|min|mins|minute|minutes|h|hr|hrs|hour|hours|d|day|days)$/i;
	const match = input.match(regex);

	if (!match) {
		return null;
	}

	const value = parseInt(match[1], 10);
	const unit = match[2].toLowerCase();

	switch (unit) {
		case 'sec':
		case 'second':
		case 'seconds':
		case 's':
			return moment.duration(value, 'seconds');
		case 'min':
		case 'mins':
		case 'minute':
		case 'minutes':
		case 'm':
			return moment.duration(value, 'minutes');
		case 'hr':
		case 'hour':
		case 'hours':
		case 'h':
			return moment.duration(value, 'hours');
		default:
			return null;
	}
}

export function getSuccessLoggerData(guild: Guild | null, user: User, command: Command) {
	const shard = getShardInfo(guild?.shardId ?? 0);
	const commandName = getCommandInfo(command);
	const author = getAuthorInfo(user);
	const sentAt = getGuildInfo(guild);

	return { shard, commandName, author, sentAt };
}

function getShardInfo(id: number) {
	return `[${cyan(id.toString())}]`;
}

function getCommandInfo(command: Command) {
	return cyan(command.name);
}

function getAuthorInfo(author: User | APIUser) {
	return `${author.username}[${cyan(author.id)}]`;
}

function getGuildInfo(guild: Guild | null) {
	if (guild === null) return 'Direct Messages';
	return `${guild.name}[${cyan(guild.id)}]`;
}
