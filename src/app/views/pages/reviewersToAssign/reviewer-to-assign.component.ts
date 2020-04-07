import {Component, Inject, Injectable, Input, OnDestroy, OnInit, Optional, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSort, MatTableDataSource} from '@angular/material';
import {Reviewer} from '../../../core/admin/_models/review-in-progress.model';
import {DatePipe} from '@angular/common';
import {AdminService} from '../../../core/admin/_services/admin.service';
import {Subscription} from 'rxjs';
import {SelectionModel} from '@angular/cdk/collections';
import {FormControl, Validators} from '@angular/forms';

@Component({
	selector: 'kt-modal3',
	templateUrl: './reviewer-to-assign.component.html',
	styleUrls: ['./reviewer-to-assign.component.scss', '../review-in-progress/assigned-works/assigned-work.component.scss']
})
export class ReviewerToAssignComponent implements OnInit, OnDestroy {

	@ViewChild(MatSort, {static: true}) sort: MatSort;

	dataSource: MatTableDataSource<Reviewer>;
	displayedColumns = ['id', 'fullname', 'credentialType', 'roleType', 'reviewedThisMonth', 'totalReviews', 'setDueDate'];
	selection = new SelectionModel<Reviewer>(false, []);

	due_date: FormControl = new FormControl('', [Validators.required]);

	due_date_text: string = '';
	minDate: Date = new Date(Date.now());

	subscriptions: Subscription[] = [];
	clicked: boolean[] = [];

	selectedReviewer: any;

	constructor(
		private dialogRef: MatDialogRef<ReviewerToAssignComponent>,
		@Optional() @Inject(MAT_DIALOG_DATA) public data: any,
		private datepipe: DatePipe,
		private adminService: AdminService,
	) {
	}

	ngOnInit() {
		this.dataSource = new MatTableDataSource<Reviewer>();
		this.loadReviewers();

		// console.log(this.reviewer);
	}

	ngOnDestroy() {
		if (this.subscriptions.length > 0) {
			this.subscriptions.forEach(sub => sub.unsubscribe());
		}
	}

	close() {
		this.dialogRef.close({event: 'close', data: 'close'});
	}

	switch() {
		if (this.due_date.invalid) {
			this.due_date.markAllAsTouched();
			return;
		}

		this.due_date_text = this.datepipe.transform(this.due_date.value, 'yyyy-MM-dd');


		this.dialogRef.close({
			event: 'close', assignment:
				{
					'workID': this.data.workID,
					'reviewer': this.selectedReviewer,
					'dueDate': this.due_date_text
				}
		});


	}

	loadReviewers() {
		const subsc = this.adminService.getReviewersForAssignment(this.data.workID).subscribe(
			res => {
				res = res.filter(user => user.ReviewerID !== this.data.reviewer.ReviewerID);
				this.dataSource.data = res;
			}
		);
		this.subscriptions.push(subsc);
	}


	isControlHasError(validationType: string) {
		if (!this.due_date) {
			return false;
		}
		const result = this.due_date.hasError(validationType) && (this.due_date.dirty || this.due_date.touched);
		return result;
	}

	rowClicked(row: any) {
		this.due_date_text = '';
		this.clicked.length = 0;
		this.clicked[row.ReviewerID] = true;
		this.selectedReviewer = row;

	}

}
