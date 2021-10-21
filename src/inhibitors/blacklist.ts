import { BotInhibitor } from '../lib/extensions/BotInhibitor';
import { Message } from 'discord.js';
import { AkairoMessage, Command } from 'discord-akairo';

export default class BlacklistInhibitor extends BotInhibitor {
	public constructor() {
		super('blacklist', {
			reason: 'blacklist',
			type: 'pre'
		});
	}

	public exec(message: Message | AkairoMessage, command?: Command): boolean {
		const blacklist = [];

		return blacklist.includes(message.author.id);
	}
}
