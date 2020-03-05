import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ReviewHistory} from '../../../core/reviewer/_models/review-history.model';
import {Subscription} from 'rxjs';
import * as fromReviewer from '../../../core/reviewer/_reducers';
import {Store} from '@ngrx/store';
import {AssignmentHistoryRequested} from '../../../core/reviewer/_actions/assignment.actions';
import {User1} from '../../../core/auth/_models/user1.model';
import {Assignment} from '../../../core/reviewer/_models/assignment.model';

@Component({
	selector: 'kt-assignment-history-work',
	templateUrl: './assignment-history.component.html',
	styleUrls: ['./assignment-history.component.scss']
})
export class AssignmentHistoryComponent implements OnInit, OnDestroy {

	dataSource: MatTableDataSource<Assignment>;
	displayedColumns = ['id', 'Title', 'DateAssigned', 'DueDate', 'Action'];

	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;


	// Subscriptions
	private subscriptions: Subscription[] = [];

	constructor(
		private store: Store<fromReviewer.ReviewerState>
	) {
		this.dataSource = new MatTableDataSource<Assignment>();

	}

	ngOnInit() {
		this.store.dispatch(new AssignmentHistoryRequested(this.getUserId()));
		this.loadAssignmentHistory();
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}

	loadAssignmentHistory() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;

		let subc$ = this.store.select(fromReviewer.getAssignmentHistoryLoaded).subscribe(isLoaded => {
			if (isLoaded) {
				let loadSubc$ = this.store.select(fromReviewer.getAssignmentHistory)
					.subscribe(res => {
						this.dataSource.data = res;
					});
				this.subscriptions.push(loadSubc$);
			}
		});
	}

	getUserId() {
		let user: User1 = JSON.parse(localStorage.getItem('user'));
		return user.id;
	}

}
