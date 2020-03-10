import {Action} from '@ngrx/store';
import {ReviewHistory} from '../_models/review-history.model';

export enum ReviewHistoryActionTypes {

	ReviewHistoryRequested = '[Reviewer] Review History Requested',
	ReviewHistoryLoaded = '[Reviewer] Review History Loaded'
}

export class ReviewHistoryRequested implements Action {
	readonly type = ReviewHistoryActionTypes.ReviewHistoryRequested;
}

export class ReviewHistoryLoaded implements Action {
	readonly type = ReviewHistoryActionTypes.ReviewHistoryLoaded;

	constructor(public payload: ReviewHistory[]) {
	}
}

export type ReviewHistoryActions = ReviewHistoryRequested | ReviewHistoryLoaded;
