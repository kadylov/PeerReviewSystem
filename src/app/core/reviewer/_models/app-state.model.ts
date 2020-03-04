import {ReviewHistory} from './review-history.model';
import {ReviewHistoryState} from '../_reducers/review-history.reducers';


export interface AppState {
	readonly reviewHist1: ReviewHistoryState[];

}
