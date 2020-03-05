import {Assignment} from '../_models/assignment.model';
import {AssignmentActions, AssignmentActionTypes} from '../_actions/assignment.actions';

export interface AssignmentState {
	data: Assignment[],
	loaded: boolean,
	loading: boolean
}


export const initialState: AssignmentState = {
	data: [],
	loaded: false,
	loading: false
};

export function assignmentReducer(
	state: AssignmentState = initialState,
	action: AssignmentActions

): AssignmentState {

	switch (action.type) {
		case AssignmentActionTypes.AssignmentsRequested:
			return {
				...state,
				loaded: false,
				loading: true,
			};

		case AssignmentActionTypes.AssignmentsLoaded:
			return {
				...state,
				data: action.payload,
				loaded: true,
				loading: false
			};

		case AssignmentActionTypes.AssignmentHistoryRequested:
			return {
				...state,
				loaded: false,
				loading:true
			};

		case AssignmentActionTypes.AssignmentHistoryLoaded:
			return {
				...state,
				data: action.payload,
				loaded: true,
				loading:false
			};

		default:
			return state;
	}
}

export const getAssignmentData=(state: AssignmentState)=>state.data;
export const getAssignmentLoaded=(state: AssignmentState)=>state.loaded;
export const getAssignmentLoading=(state: AssignmentState)=>state.loading;

export const getAssignmentHistoryData =  (state: AssignmentState) => state.data;
export const getAssignmentHistoryLoaded = (state: AssignmentState) => state.loaded;
export const getAssignmentHistoryLoading = (state: AssignmentState) => state.loading;
