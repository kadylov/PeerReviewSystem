import {ReviewHistory} from '../_models/review-history.model';
import {ReviewHistoryActions, ReviewHistoryActionTypes} from '../_actions/review-history.actions';

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


export const getReviewHistoryData =  (state: ReviewHistoryState) => state.data;
export const getReviewHistoryLoaded = (state: ReviewHistoryState) => state.loaded;
export const getReviewHistoryLoading = (state: ReviewHistoryState) => state.loading;
