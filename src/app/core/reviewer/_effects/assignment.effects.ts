import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ReviewerService} from '../_services/reviewer.service';


import {
	AssignmentActionTypes,
	AssignmentHistoryLoaded,
	AssignmentHistoryRequested,
	AssignmentLoaded,
	AssignmentRequested,
} from '../_actions/assignment.actions';
import {map, mergeMap} from 'rxjs/operators';


@Injectable()
export class AssignmentEffects {

	constructor(
		private actions$: Actions,
		private reviewerService: ReviewerService
	) {
	}

	@Effect()
	loadCurrentAssignments$ = this.actions$
		.pipe(
			ofType<AssignmentRequested>(AssignmentActionTypes.AssignmentsRequested),
			mergeMap(
				(user) => this.reviewerService.getCurrentAssignment(user.id)
					.pipe(
						map(data => new AssignmentLoaded(data))
					)
			)
		);


	@Effect()
	loadAssignmentHistory$ = this.actions$
		.pipe(
			ofType<AssignmentHistoryRequested>(AssignmentActionTypes.AssignmentHistoryRequested),
			mergeMap(
				(user) => this.reviewerService.getAssignmentHistory(user.id)
					.pipe(
						map(data => new AssignmentHistoryLoaded(data))
					)
			)
		);
}
