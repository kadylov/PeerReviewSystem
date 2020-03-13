import {Pipe, PipeTransform} from '@angular/core';
import {Message} from '../../../reviewer/_models/message.model';


@Pipe({
	name: 'sortbyDate'
})
export class CustomSortPipe implements PipeTransform {
	transform(messages: Message[]): Message[] {

		if (messages.length > 0) {

			let copy: Message[] = Object.assign([], messages);
			copy.sort((a: Message, b: Message) => this.compare(a.DTime, b.DTime));
			return copy;
		}
	}

	private compare(lfh: string, rhs: string): number {
		if (lfh > rhs) {
			return 1;
		} else if (lfh < rhs) {
			return -1;
		} else {
			return 0;
		}
	}
}
