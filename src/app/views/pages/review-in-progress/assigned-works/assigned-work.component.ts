import {MatDialog, MatDialogRef, MatSort, MatTableDataSource} from '@angular/material';
import {Reviewer, ReviewInProgressModel} from '../../../../core/admin/_models/review-in-progress.model';
import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {DatePipe} from '@angular/common';
import {ReviewerToAssignComponent} from '../../reviewersToAssign/reviewer-to-assign.component';
import {BehaviorSubject, Subscription} from 'rxjs';
import {AdminService} from '../../../../core/admin/_services/admin.service';
import {LayoutUtilsService, MessageType} from '../../../../core/_base/crud';


@Component({
		selector: 'assigned-work-table',
		templateUrl: './assigned-work.component.html',
		styleUrls: ['assigned-work.component.scss'],
	}
)
export class AssignedListComponent implements OnInit, OnDestroy {


	dataSource: MatTableDataSource<Reviewer>;
	displayedColumns = ['id', 'Reviewer', 'Role', 'DueDate', 'Status', 'Action'];

	@ViewChild(MatSort, {static: true}) sort: MatSort;
	@Input() reviewers: any;
	@Input() workID: number;

	currentDate: string;
	subscriptions: Subscription[] = [];

	constructor(private datePipe: DatePipe,
				public dialog: MatDialog,
				private adminService: AdminService,
				private layoutUtilsService: LayoutUtilsService,
	) {
		this.currentDate = datePipe.transform(new Date(Date.now()), 'yyyy-MM-dd');

	}

	ngOnDestroy(): void {
		if (this.subscriptions.length > 0) {
			this.subscriptions.forEach(sub => sub.unsubscribe());
		}
	}

	ngOnInit(): void {
		this.dataSource = new MatTableDataSource<Reviewer>(this.reviewers);
	}


	getItemStatusString(reviewDue: string = ''): string {
		if (reviewDue < this.currentDate) {
			return 'overdue';
		} else if (reviewDue >= this.currentDate) {
			return 'due';
		} else {
			return '';
		}
	}

	/**
	 * Returens item CSS Class Name by status
	 *
	 * @param status: number
	 */
	getItemCssClassByStatus(reviewDue: string = ''): string {

		// console.log(this.currentDate);

		// due date = 17 curr date =22
		if (reviewDue < this.currentDate) {
			return 'danger';
		} else if (reviewDue >= this.currentDate) {
			return 'success';
		} else {
			return '';
		}
	}


	switchUser(reviewer: any) {

		const reviewerToSwap = reviewer;

		const dialogRef = this.dialog.open(ReviewerToAssignComponent, {
			width: '1131px',
			data: {'reviewer': reviewer,
				'workID':this.workID},
		});

		dialogRef.afterClosed().subscribe(result => {

			if (result.data == 'close') {
				return;
			} else {
				// first, deactivate reviewer whose assignment is overdue
				// and then swap the deactivated reviewer with selected reviewer from the dialogbox
				this.deactivateUserByIdFromAssignment(reviewerToSwap.ReviewerID, this.workID);

				const newAssignedReviewer = {
					ReviewerID: result.assignment.reviewer.ReviewerID,
					ReviewerName: result.assignment.reviewer.ReviewerName,
					Role: result.assignment.reviewer.Role,
					DueDate: result.assignment.dueDate
				};

				const assignment = {
					adminID: this.getAdminId(),
					reviewerID: newAssignedReviewer.ReviewerID,
					workID: this.workID,
					dueDate: result.assignment.dueDate,
					dateAssigned: this.currentDate
				};

				this.subscriptions.push(this.adminService.assignReviewer(assignment).subscribe(
					res => {

						this.updateRowData(reviewerToSwap, newAssignedReviewer);
						this.displayConfirmationMessage();

					}
				));

			}

		});
	}


	private deactivateUserByIdFromAssignment(reviewerId: number, workId: number) {
		this.subscriptions.push(this.adminService.deactivateUserFromAssignment(reviewerId, workId).subscribe());
	}

	private getAdminId() {
		const user = JSON.parse(localStorage.getItem('user'));

		return user.id;
	}


	private updateRowData(reviewer, newReviewer) {
		console.log('Reviewer ', reviewer);
		console.log('Reviewer2 ', newReviewer);

		let newData = Object.assign([], this.reviewers);
		console.log('Before ', newData);

		newData = newData.filter(r =>
			r.ReviewerID !== reviewer.ReviewerID
		);

		newData.push(newReviewer);
		this.dataSource.data = newData;
	}


	private displayConfirmationMessage() {
		const message = `The reviewer has been swapped successfully.`;
		this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, false);
	}


}
