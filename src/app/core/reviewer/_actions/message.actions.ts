import {Action} from '@ngrx/store';
import {Message} from '../_models/message.model';

export enum MessageActionTypes {
	MessagesRequested = '[Reviewer] Messages Requested',
	MessagesLoaded = '[Reviewer] Messages Loaded',

	NewMessageCreated = '[Reviewer] New Message Created',
	NewMessageSavedOnServer = '[Reviewer] New Message Saved On Server'
}

export class MessagesRequested implements Action {
	readonly type = MessageActionTypes.MessagesRequested;

	constructor(public workID: number) {
	}
}

export class MessagesLoaded implements Action {
	readonly type = MessageActionTypes.MessagesLoaded;

	constructor(public payload: Message[]) {
	}
}

export class NewMessageCreated implements Action {

	readonly type = MessageActionTypes.NewMessageCreated;

	constructor(public payload: Message) {
	}
}

export class NewMessageSavedOnServer implements Action {

	readonly type = MessageActionTypes.NewMessageSavedOnServer;
	constructor(public payload: Message) {
	}
}

export type MessageActions =
	MessagesRequested
	| MessagesLoaded
	| NewMessageCreated
	| NewMessageSavedOnServer
