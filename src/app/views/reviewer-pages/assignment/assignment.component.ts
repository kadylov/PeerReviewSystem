import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Assignment} from '../../../core/reviewer/_models/assignment.model';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromReviewer from '../../../core/reviewer/_reducers';
import {AssignmentRequested} from '../../../core/reviewer/_actions/assignment.actions';
import {User1} from '../../../core/auth/_models/user1.model';


@Component({
	selector: 'kt-assigned-work',
	templateUrl: './assignment.component.html',
})
export class AssignmentComponent implements OnInit, OnDestroy{

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
		this.store.dispatch(new AssignmentRequested(this.getUserId()));
		this.loadAssignmentHistory();
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}

	loadAssignmentHistory() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;

		this.store.select(fromReviewer.getCurrAssignmentsLoaded).subscribe(isLoaded => {
			if (isLoaded) {
				let subc$ = this.store.select(fromReviewer.getCurrAssignments)
					.subscribe(res => {
						this.dataSource.data = res;
					});

				this.subscriptions.push(subc$)
			}
		});
	}

	getUserId() {
		let user: User1 = JSON.parse(localStorage.getItem('user'));
		return user.id;
	}



}
