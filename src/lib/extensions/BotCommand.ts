import { Command } from 'discord-akairo';
import { BotClient } from './BotClient';

export class BotCommand extends Command {
	public declare client: BotClient;
}
