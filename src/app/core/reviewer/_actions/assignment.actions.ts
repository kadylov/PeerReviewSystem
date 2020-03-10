import {Action} from '@ngrx/store';
import {Assignment} from '../_models/assignment.model';

export enum AssignmentActionTypes {

	AssignmentsRequested = '[Reviewer] Assignments Requested',
	AssignmentsLoaded = '[Reviewer] Assignments Loaded',

	AssignmentHistoryRequested = '[Reviewer] Assignment History Requested',
	AssignmentHistoryLoaded = '[Reviewer] Assignment History Loaded',
}

export class AssignmentRequested implements Action {
	readonly type = AssignmentActionTypes.AssignmentsRequested;

	constructor(public id: number) {
	}
}

export class AssignmentLoaded implements Action {
	readonly type = AssignmentActionTypes.AssignmentsLoaded;

	constructor(public payload: Assignment[]) {
	}
}

export class AssignmentHistoryRequested implements Action {
	readonly type = AssignmentActionTypes.AssignmentHistoryRequested;

	constructor(public id: number) {
	}
}

export class AssignmentHistoryLoaded implements Action {
	readonly type = AssignmentActionTypes.AssignmentHistoryLoaded;

	constructor(public payload: Assignment[]) {
	}
}

export type AssignmentActions =
	 AssignmentRequested
	| AssignmentLoaded
	| AssignmentHistoryRequested
	| AssignmentHistoryLoaded

