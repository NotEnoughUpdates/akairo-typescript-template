import { Listener } from 'discord-akairo';
import { BotClient } from './BotClient';

export class BotListener extends Listener {
	public declare client: BotClient;
}
