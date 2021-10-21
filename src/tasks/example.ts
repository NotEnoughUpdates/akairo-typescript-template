import { BotTask } from '../lib/extensions/BotTask';

export default class ExampleTask extends BotTask {
	public constructor() {
		super('example', {
			runOnStart: false, // run the task on bot start
			delay: 1_000_000 // time between each task in milliseconds
		});
	}

	public exec() {
		// do something
	}
}
