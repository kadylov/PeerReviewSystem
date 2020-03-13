import {Message} from '../_models/message.model';
import {MessageActions, MessageActionTypes} from '../_actions/message.actions';

export interface MessageState {
	data: Message[],
	msgs_loaded: boolean,
	msgs_loading: boolean,
	msg_created: boolean,
	msg_saved_onserver:boolean
}


export const initialState: MessageState = {
	data: [],
	msgs_loaded: false,
	msgs_loading: false,
	msg_created: false,
	msg_saved_onserver:false,
};

export function messageReducer(
	state: MessageState = initialState,
	action: MessageActions
): MessageState {

	switch (action.type) {

		case MessageActionTypes.MessagesRequested:
			return {
				...state,
				msgs_loaded: false,
				msgs_loading: true,
				msg_created: false,
				msg_saved_onserver:false
			};

		case MessageActionTypes.MessagesLoaded:
			return {
				...state,
				data: action.payload,
				msgs_loaded: true,
				msgs_loading: false,
				msg_created: false,
				msg_saved_onserver:false

			};

		case MessageActionTypes.NewMessageCreated:
			// let msg: Message[] = Object.assign([], state.data);
			// msg.push(action.payload);

			return {
				...state,
				// data: msg,
				msgs_loaded: false,
				msgs_loading: false,
				msg_created: true,
				msg_saved_onserver:false

			};

		case MessageActionTypes.NewMessageSavedOnServer:
			let msg: Message[] = Object.assign([], state.data);
			msg.push(action.payload);

			return {
				...state,
				data: msg,
				msgs_loaded: false,
				msgs_loading: false,
				msg_created: false,
				msg_saved_onserver:true

			};

		default:
			return state;
	}
}

export const getMessageData = (state: MessageState) => state.data;
export const getMessageLoaded = (state: MessageState) => state.msgs_loaded;
export const getMessageLoading = (state: MessageState) => state.msgs_loading;
export const getNewMessageCreated = (state: MessageState) => state.msg_created;
