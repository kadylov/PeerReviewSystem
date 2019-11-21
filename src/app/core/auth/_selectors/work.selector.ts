// NGRX
import { createFeatureSelector, createSelector } from '@ngrx/store';
// CRUD
import { QueryResultsModel, HttpExtenstionsModel } from '../../_base/crud';
// State
import {WorksState} from "../_reducers/work.reducers";
import { each } from 'lodash';
import {Work} from "../../../views/pages/public-page/work-list/Work";


export const selectWorksState = createFeatureSelector<WorksState>('works');

export const selectUserById = (workId: number) => createSelector(
    selectWorksState,
    worksState => worksState.entities[workId]
);

export const selectUsersPageLoading = createSelector(
    selectWorksState,
    worksState => {
        return worksState.listLoading;
    }
);

export const selectWorksInStore = createSelector(
    selectWorksState,
    worksState => {
        const items: Work[] = [];
        each(worksState.entities, element => {
            items.push(element);
        });
        const httpExtension = new HttpExtenstionsModel();
        const result: Work[] = httpExtension.sortArray(items, worksState.lastQuery.sortField, worksState.lastQuery.sortOrder);
        return new QueryResultsModel(result, worksState.totalCount, '');
    }
);


export const selectWorksPageLoading = createSelector(
    selectWorksState,
    worksState => {
        return worksState.listLoading;
    }
);

export const selectWorksActionLoading = createSelector(
    selectWorksState,
    worksState => worksState.actionsloading
);

export const selectLastCreatedWorkId = createSelector(
    selectWorksState,
    worksState => worksState.lastCreatedWorkId
);

export const selectWorksPageLastQuery = createSelector(
    selectWorksState,
    worksState => worksState.lastQuery
);

export const selectWorksShowInitWaitingMessage = createSelector(
    selectWorksState,
    worksState => worksState.showInitWaitingMessage
);

export const selectHasUsersInStore = createSelector(
    selectWorksState,
    queryResult => {
        if (!queryResult.totalCount) {
            return false;
        }

        return true;
    }
);
