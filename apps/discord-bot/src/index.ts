import './lib/setup';
import { LogLevel, SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits, Partials } from 'discord.js';
import '@sapphire/plugin-i18next/register';
const client = new SapphireClient({
	logger: {
		level: LogLevel.Debug
	},
	intents: [GatewayIntentBits.DirectMessages, GatewayIntentBits.Guilds, GatewayIntentBits.GuildModeration, GatewayIntentBits.GuildMembers],
	partials: [Partials.GuildMember]
});
const main = async () => {
	try {
		client.logger.info('Logging in');
		await client.login();
		client.logger.info('logged in');
	} catch (error) {
		client.logger.fatal(error);
		client.destroy();
		process.exit(1);
	}
};

main();
