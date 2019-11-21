// NGRX
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
// CRUD
import { Work} from "../../../views/pages/public-page/work-list/Work";
// Models
import { QueryParamsModel } from '../../_base/crud';

export enum WorkActionTypes {
    AllWorksRequested = '[Works Module] All Works Requested',
    AllWorksLoaded = '[Works API] All Works Loaded',
    WorkOnServerCreated = '[Edit Work Component] Work On Server Created',
    WorkCreated = '[Edit Work Dialog] Work Created',
    WorkUpdated = '[Edit Work Dialog] Work Updated',
    WorkDeleted = '[Works List Page] Work Deleted',
    WorksPageRequested = '[Works List Page] Works Page Requested',
    WorksPageLoaded = '[Works API] Works Page Loaded',
    WorksPageCancelled = '[Works API] Works Page Cancelled',
    WorksPageToggleLoading = '[Works] Works Page Toggle Loading',
    WorksActionToggleLoading = '[Works] Works Action Toggle Loading'
}


export class WorkOnServerCreated implements Action {
    readonly type = WorkActionTypes.WorkOnServerCreated;
    constructor(public payload: { work: Work }) { }
}

export class WorkCreated implements Action {
    readonly type = WorkActionTypes.WorkCreated;
    constructor(public payload: { work: Work }) { }
}


export class WorkUpdated implements Action {
    readonly type = WorkActionTypes.WorkUpdated;
    constructor(public payload: {
        partialWork: Update<Work>,
        work: Work
    }) { }
}

export class WorkDeleted implements Action {
    readonly type = WorkActionTypes.WorkDeleted;
    constructor(public payload: { id: number }) {}
}

export class WorksPageRequested implements Action {
    readonly type = WorkActionTypes.WorksPageRequested;
    constructor(public payload: { page: QueryParamsModel }) { }
}

export class WorksPageLoaded implements Action {
    readonly type = WorkActionTypes.WorksPageLoaded;
    constructor(public payload: { works: Work[], totalCount: number, page: QueryParamsModel  }) { }
}


export class WorksPageCancelled implements Action {
    readonly type = WorkActionTypes.WorksPageCancelled;
}

export class WorksPageToggleLoading implements Action {
    readonly type = WorkActionTypes.WorksPageToggleLoading;
    constructor(public payload: { isLoading: boolean }) { }
}

export class WorksActionToggleLoading implements Action {
    readonly type = WorkActionTypes.WorksActionToggleLoading;
    constructor(public payload: { isLoading: boolean }) { }
}

export type WorkActions = WorkCreated
    | WorkUpdated
    | WorkDeleted
    | WorkOnServerCreated
    | WorksPageLoaded
    | WorksPageCancelled
    | WorksPageToggleLoading
    | WorksPageRequested
    | WorksActionToggleLoading;
