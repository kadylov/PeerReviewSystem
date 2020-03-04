import {ReviewHistory} from '../_models/review-history.model';
import {ReviewHistoryActions, ReviewHistoryActionTypes} from '../_actions/review-history.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Actions} from '@ngrx/effects';


export interface ReviewHistoryState {
	data: ReviewHistory[],
	loaded: boolean,
	loading: boolean
}


export const initialState: ReviewHistoryState = {
	data: [],
	loaded: false,
	loading: false
};

const getReviewHistoryFeatureState = createFeatureSelector<ReviewHistoryState>('reviewHistory1');

export const getReviewHistoryData = createSelector(
	getReviewHistoryFeatureState,
	state => state.data
);


export function reviewHistoryReducer(
	state: ReviewHistoryState = initialState,
	action: ReviewHistoryActions
): ReviewHistoryState {

	switch (action.type) {

		case ReviewHistoryActionTypes.ReviewHistoryRequested:
			return {
				...state,
				loaded: false,
				loading: true,
			};

		case ReviewHistoryActionTypes.ReviewHistoryLoaded:
			return {
				...state,
				data: action.payload,
				loaded: true,
				loading: false
			};

		default:
			return state;
	}
}


