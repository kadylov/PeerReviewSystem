import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ReviewHistory} from '../../../core/reviewer/_models/review-history.model';
import {ReviewerService} from '../../../core/reviewer/_services/reviewer.service';
import {Observable, Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {ReviewHistoryRequested} from '../../../core/reviewer/_actions/review-history.actions';
import * as fromReviewer from '../../../core/reviewer/_reducers/';

@Component({
	selector: 'kt-review-history',
	templateUrl: './review-history.component.html',
	styleUrls: ['./review-history.component.scss']
})
export class ReviewHistoryComponent implements OnInit, OnDestroy {

	dataSource: MatTableDataSource<ReviewHistory>;
	displayedColumns = ['id', 'Title', 'DateReviewed', 'Score', 'Action'];

	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;

	// Subscriptions
	private subscriptions: Subscription[] = [];

	constructor(
		private store: Store<fromReviewer.ReviewerState>////////////////////////////////////////////////
	) {
		this.dataSource = new MatTableDataSource<ReviewHistory>();
	}

	ngOnInit() {
		this.store.dispatch(new ReviewHistoryRequested());
		this.loadItems();
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}


	/**
	 * Load items
	 *
	 * @param firstLoad: boolean
	 */
	loadItems(firstLoad: boolean = false) {

		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;


		this.store.select(fromReviewer.getAllHistoryLoaded).subscribe(isLoaded => {
			if (isLoaded) {
				let subc$ = this.store.select(fromReviewer.getAllHistory)
				.subscribe(res => {
					this.dataSource.data = res;
					// console.log(res);
				});

				this.subscriptions.push(subc$);
			}
		});



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
