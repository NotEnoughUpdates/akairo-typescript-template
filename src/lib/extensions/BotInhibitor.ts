import { Inhibitor } from 'discord-akairo';
import { BotClient } from './BotClient';

export class BotInhibitor extends Inhibitor {
	public declare client: BotClient;
}
