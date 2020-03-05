import * as fromReviewHistory from '../_reducers/review-history.reducers';
import * as fromAssignment from '../_reducers/assignment.reducers';


import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {AssignmentState} from '../_reducers/assignment.reducers';



export interface ReviewerState {

	reviewHistory: fromReviewHistory.ReviewHistoryState,
	assignments: fromAssignment.AssignmentState,

}

export const reducers: ActionReducerMap<ReviewerState> = {
	reviewHistory: fromReviewHistory.reviewHistoryReducer,
	assignments: fromAssignment.assignmentReducer,
};


export const getReviewerState = createFeatureSelector<ReviewerState>(
	'reviewer'
);


export const getHistoryState = createSelector(getReviewerState,(state:ReviewerState)=>state.reviewHistory);
export const getAssignmentState = createSelector(getReviewerState,(state:ReviewerState)=>state.assignments);

export const getAllHistory = createSelector(getHistoryState, fromReviewHistory.getReviewHistoryData);
export const getAllHistoryLoaded = createSelector(getHistoryState, fromReviewHistory.getReviewHistoryLoaded);
export const getAllHistoryLoading = createSelector(getHistoryState, fromReviewHistory.getReviewHistoryLoading);


export const getCurrAssignments = createSelector(getAssignmentState, fromAssignment.getAssignmentData);
export const getCurrAssignmentsLoaded = createSelector(getAssignmentState, fromAssignment.getAssignmentLoaded);
export const getCurrAssignmentsLoading = createSelector(getAssignmentState, fromAssignment.getAssignmentLoading);

export const getAssignmentHistory = createSelector(getAssignmentState, fromAssignment.getAssignmentHistoryData);
export const getAssignmentHistoryLoaded = createSelector(getAssignmentState, fromAssignment.getAssignmentHistoryLoaded);
export const getAssignmentHistoryLoading = createSelector(getAssignmentState, fromAssignment.getAssignmentHistoryLoading);

