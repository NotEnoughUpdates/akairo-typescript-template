import { Task } from 'discord-akairo';
import { BotClient } from './BotClient';

export class BotTask extends Task {
	public declare client: BotClient;
}
