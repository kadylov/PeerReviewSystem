import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ReviewerService} from '../_services/reviewer.service';
import {ReviewHistoryRequested} from '../_actions/reviewer.actions';
import {ReviewHistoryActions, ReviewHistoryActionTypes, ReviewHistoryLoaded} from '../_actions/review-history.actions';
import {map, mergeMap, take} from 'rxjs/operators';
import {defer, Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {AllRolesRequested} from '../../auth';


@Injectable()
export class ReviewHistoryEffects {

	constructor(
		private actions$: Actions,
		private reviewerService: ReviewerService
	) {
	}

	@Effect()
	loadReviewHistory$ = this.actions$
		.pipe(
			ofType<ReviewHistoryRequested>(ReviewHistoryActionTypes.ReviewHistoryRequested),
			mergeMap(
				() => this.reviewerService.getAllReviews()
					.pipe(
						map(data =>
							new ReviewHistoryLoaded(data)
						)
					)
			),
		);
}
