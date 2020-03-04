import {Action} from '@ngrx/store';

export enum ReviewerActionTypes {

	ReviewHistoryRequested = '[Reviewer] Review History Requested',
	ReviewHistoryLoaded = '[Reviewer] Review History Loaded',


	AllAssignmentsRequested = '[Reviewer] All Assignments Requested',
	AllAssignmentsLoaded = '[Reviewer] All Assignments Loaded',
}


export class ReviewHistoryRequested implements Action {
readonly type=ReviewerActionTypes.ReviewHistoryRequested
}
