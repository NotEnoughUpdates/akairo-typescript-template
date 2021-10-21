import {
	AkairoClient,
	CommandHandler,
	InhibitorHandler,
	ListenerHandler,
	TaskHandler
} from 'discord-akairo';
import { Intents } from 'discord.js';
import { join } from 'path';

export interface BotConfig {
	token: string;
}

export class BotClient extends AkairoClient {
	public config: BotConfig;
	public commandHandler = new CommandHandler(this, {
		prefix: '-',
		commandUtil: true,
		handleEdits: true,
		directory: join(__dirname, '..', '..', 'commands'),
		allowMention: true,
		automateCategories: true
	});
	public listenerHandler = new ListenerHandler(this, {
		directory: join(__dirname, '..', '..', 'listeners'),
		automateCategories: true
	});
	public inhibitorHandler = new InhibitorHandler(this, {
		directory: join(__dirname, '..', '..', 'inhibitors'),
		automateCategories: true
	});
	public taskHandler = new TaskHandler(this, {
		directory: join(__dirname, '..', '..', 'tasks'),
		automateCategories: true
	});
	public constructor(config: BotConfig) {
		super({
			ownerID: ['id here'],
			intents: [
				Intents.FLAGS.DIRECT_MESSAGES,
				Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
				Intents.FLAGS.DIRECT_MESSAGE_TYPING,
				Intents.FLAGS.GUILDS,
				Intents.FLAGS.GUILD_BANS,
				Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
				Intents.FLAGS.GUILD_INTEGRATIONS,
				Intents.FLAGS.GUILD_INVITES,
				Intents.FLAGS.GUILD_MESSAGES,
				Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
				Intents.FLAGS.GUILD_MESSAGE_TYPING,
				Intents.FLAGS.GUILD_VOICE_STATES,
				Intents.FLAGS.GUILD_WEBHOOKS
			],
			allowedMentions: { parse: ['users'] } // Disables all mentions except for users
		});
		this.config = config;
	}
	async #init(): Promise<void> {
		this.commandHandler.useListenerHandler(this.listenerHandler);
		this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
		this.listenerHandler.setEmitters({
			commandHandler: this.commandHandler,
			listenerHandler: this.listenerHandler,
			process
		});
		// loads all the stuff
		const loaders = {
			commands: this.commandHandler,
			listeners: this.listenerHandler,
			inhibitors: this.inhibitorHandler,
			tasks: this.taskHandler
		};
		for (const loader in loaders) {
			try {
				loaders[loader].loadAll();
				console.log('Successfully loaded ' + loader + '.');
			} catch (e) {
				console.error('Unable to load ' + loader + ' with error ' + e);
			}
		}
	}

	public async start(): Promise<string> {
		await this.#init();

		return this.login(this.config.token);
	}
}
