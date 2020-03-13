import * as fromReviewHistory from '../_reducers/review-history.reducers';
import * as fromAssignment from '../_reducers/assignment.reducers';
import * as fromMessage from '../_reducers/message.reducers';


import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {AssignmentState} from '../_reducers/assignment.reducers';
import {MessageState} from './message.reducers';


export interface ReviewerState {

	reviewHistory: fromReviewHistory.ReviewHistoryState,
	assignments: fromAssignment.AssignmentState,
	messages: fromMessage.MessageState,
}

export const reducers: ActionReducerMap<ReviewerState> = {
	reviewHistory: fromReviewHistory.reviewHistoryReducer,
	assignments: fromAssignment.assignmentReducer,
	messages: fromMessage.messageReducer,
};


export const getReviewerState = createFeatureSelector<ReviewerState>(
	'reviewer'
);

export const getHistoryState = createSelector(getReviewerState, (state: ReviewerState) => state.reviewHistory);
export const getAssignmentState = createSelector(getReviewerState, (state: ReviewerState) => state.assignments);
export const getMessageState = createSelector(getReviewerState, (state: ReviewerState) => state.messages);

// Review History
export const getAllHistory = createSelector(getHistoryState, fromReviewHistory.getReviewHistoryData);
export const getAllHistoryLoaded = createSelector(getHistoryState, fromReviewHistory.getReviewHistoryLoaded);
export const getAllHistoryLoading = createSelector(getHistoryState, fromReviewHistory.getReviewHistoryLoading);

// Current Assignments
export const getCurrAssignments = createSelector(getAssignmentState, fromAssignment.getAssignmentData);
export const getCurrAssignmentsLoaded = createSelector(getAssignmentState, fromAssignment.getAssignmentLoaded);
export const getCurrAssignmentsLoading = createSelector(getAssignmentState, fromAssignment.getAssignmentLoading);

// Assignment  History
export const getAssignmentHistory = createSelector(getAssignmentState, fromAssignment.getAssignmentHistoryData);
export const getAssignmentHistoryLoaded = createSelector(getAssignmentState, fromAssignment.getAssignmentHistoryLoaded);
export const getAssignmentHistoryLoading = createSelector(getAssignmentState, fromAssignment.getAssignmentHistoryLoading);

// Messages (Discussion history)
export const getMessages = createSelector(getMessageState, fromMessage.getMessageData);
export const getMessagesLoaded = createSelector(getMessageState, fromMessage.getMessageLoaded);
export const getMessagesLoading = createSelector(getMessageState, fromMessage.getMessageLoading);
export const getNewMessage = createSelector(getMessageState, fromMessage.getNewMessageCreated);
