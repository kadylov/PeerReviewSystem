import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ReviewerService} from '../_services/reviewer.service';
import {
	MessageActionTypes,
	MessagesLoaded,
	MessagesRequested,
	NewMessageCreated,
	NewMessageSavedOnServer
} from '../_actions/message.actions';
import {catchError, groupBy, map, mergeMap, switchMap} from 'rxjs/operators';
import {Message} from '../_models/message.model';
import {AssignmentActionTypes, AssignmentHistoryLoaded, AssignmentHistoryRequested} from '../_actions/assignment.actions';
import {pipe} from 'rxjs';


@Injectable()
export class MessageEffects {

	constructor(
		private actions$: Actions,
		private reviewerService: ReviewerService
	) {
	}


	@Effect()
	loadAllMessages$ = this.actions$
		.pipe(
			ofType<MessagesRequested>(MessageActionTypes.MessagesRequested),
			mergeMap(
				(work) => this.reviewerService.getMessageHistory(work.workID)
					.pipe(
						map((data: Message[]) => new MessagesLoaded(data))
					)
			)
		);
	/*
	* this.test$ = Observable.of(['one', 'two', 'three'])
.map((data) => {
    data.sort((a, b) => {
        return a < b ? -1 : 1;
     });
    return data;
 });
	* */
	@Effect()
	createNewMessage$ = this.actions$
		.pipe(
			ofType<NewMessageCreated>(MessageActionTypes.NewMessageCreated),
			mergeMap(
				(message) => this.reviewerService.postNewMessage(message.payload)
					.pipe(
						map(() => {
							return new NewMessageSavedOnServer(message.payload);
						})
					)
			)
		);
}
