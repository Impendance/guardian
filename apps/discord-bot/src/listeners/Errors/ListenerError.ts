import type { Events } from '@sapphire/framework';
import { Listener } from '@sapphire/framework';
export class UserEvent extends Listener<typeof Events.ListenerError> {
	public async run(err: any) {
		console.log(err);
	}
}
