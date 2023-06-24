import './lib/setup';
import { LogLevel, SapphireClient } from '@sapphire/framework';
import { Backend } from '@skyra/i18next-backend';
import { GatewayIntentBits, Partials } from 'discord.js';
import i18next from 'i18next';
async function init(){
await i18next.use(Backend).init({
	backend: {
		paths: ['/locales/{{lng}}/{{ns}}.json']
	},
	cleanCode: true,
	preload: ['en-US'],
	supportedLngs: ['en-US'],
	fallbackLng: ['en-US'],
	returnNull: false,
	returnEmptyString: false
})
}
init().then(() => console.log('i18next initialized'));
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
