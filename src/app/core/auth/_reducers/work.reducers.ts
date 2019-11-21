// NGRX
import { createFeatureSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
// Actions
import { WorkActions, WorkActionTypes } from '../_actions/work.actions';
// CRUD
import { QueryParamsModel } from '../../_base/crud';
// Models
import {Work} from "../../../views/pages/public-page/work-list/Work";

// tslint:disable-next-line:no-empty-interface
export interface WorksState extends EntityState<Work> {
    listLoading: boolean;
    actionsloading: boolean;
    totalCount: number;
    lastCreatedWorkId: number;
    lastQuery: QueryParamsModel;
    showInitWaitingMessage: boolean;
}

export const adapter: EntityAdapter<Work> = createEntityAdapter<Work>();

export const initialWorksState: WorksState = adapter.getInitialState({
    listLoading: false,
    actionsloading: false,
    totalCount: 0,
    lastQuery:  new QueryParamsModel({}),
    lastCreatedWorkId: undefined,
    showInitWaitingMessage: true
});

export function worksReducer(state = initialWorksState, action: WorkActions): WorksState {
    switch  (action.type) {
        case WorkActionTypes.WorksPageToggleLoading: return {
            ...state, listLoading: action.payload.isLoading, lastCreatedWorkId: undefined
        };
        case WorkActionTypes.WorksActionToggleLoading: return {
            ...state, actionsloading: action.payload.isLoading
        };
        case WorkActionTypes.WorkOnServerCreated: return {
            ...state
        };
        case WorkActionTypes.WorkUpdated: return adapter.updateOne(action.payload.partialWork, state);
        case WorkActionTypes.WorksPageCancelled: return {
            ...state, listLoading: false, lastQuery: new QueryParamsModel({})
        };
        case WorkActionTypes.WorksPageLoaded: {
            return adapter.addMany(action.payload.works, {
                ...initialWorksState,
                totalCount: action.payload.totalCount,
                lastQuery: action.payload.page,
                listLoading: false,
                showInitWaitingMessage: false
            });
        }
        default: return state;
    }
}

export const getWorkState = createFeatureSelector<WorksState>('works');

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
