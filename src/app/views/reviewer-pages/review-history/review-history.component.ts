import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ReviewHistory} from '../../../core/reviewer/_models/review-history.model';
import {ReviewerService} from '../../../core/reviewer/_services/reviewer.service';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../core/reviewer/_models/app-state.model';
import {ReviewHistoryRequested} from '../../../core/reviewer/_actions/review-history.actions';

@Component({
	selector: 'kt-review-history',
	templateUrl: './review-history.component.html',
	styleUrls: ['./review-history.component.scss']
})
export class ReviewHistoryComponent implements OnInit {

	dataSource: MatTableDataSource<ReviewHistory>;
	displayedColumns = ['id', 'Title', 'DateReviewed', 'Score', 'Action'];

	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;


	reviewHistory$: Observable<any>;

	// reviewHistory: ReviewHistory[];

	constructor(
		private reviewerService: ReviewerService,
		private store: Store<AppState>
	) {
		this.dataSource = new MatTableDataSource<ReviewHistory>();
	}

	ngOnInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;


		this.store.dispatch(new ReviewHistoryRequested());

		this.loadItems();
	}


	/**
	 * Load items
	 *
	 * @param firstLoad: boolean
	 */
	loadItems(firstLoad: boolean = false) {

		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;

		this.reviewHistory$ = this.store.select('reviewHist1');


		// this.reviewHistory$=this.store.pipe(select('reviewHistory1'));
		// this.store.pipe(select('reviewHistory1')).subscribe(
		// 	res=>{
		// 		console.log("RES ",res);
		//
		// 	}
		// );


		// this.reviewHistory$.subscribe(res => {
		//
		// 		console.log("RES ",res);
		// 		// this.dataSource.data = res;
		// 		this.dataSource.sort = this.sort;
		// 		this.dataSource.paginator = this.paginator;
		// 	},
		// 	error => {
		// 		console.log('There was an error while retrieving review history !!!' + error);
		// 	}
		// );


		// this.dataSource.data = this.reviewHistory$.reviewHistory;


		// this.reviewerService.getAllReviews()
		// 	.subscribe(res => {
		// 			this.dataSource.data = res;
		// 			this.dataSource.sort = this.sort;
		// 			this.dataSource.paginator = this.paginator;
		// 		},
		// 		error => {
		// 			console.log('There was an error while retrieving review history !!!' + error);
		// 		}
		// 	);
	}


	applyFilter(value: any) {

	}
}
