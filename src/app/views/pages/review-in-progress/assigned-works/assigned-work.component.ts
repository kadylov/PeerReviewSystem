import {MatDialog, MatDialogRef, MatSort, MatTableDataSource} from '@angular/material';
import {Reviewer, ReviewInProgressModel} from '../../../../core/admin/_models/review-in-progress.model';
import {Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {DatePipe} from '@angular/common';


@Component({
		selector: 'assigned-work-table',
		templateUrl: './assigned-work.component.html',
		styleUrls: ['assigned-work.component.scss'],
	}
)
export class AssignedListComponent implements OnInit, OnDestroy {


	dataSource: MatTableDataSource<Reviewer>;
	displayedColumns = ['id', 'Reviewer', 'DueDate', 'Status', 'Action'];

	@ViewChild(MatSort, {static: true}) sort: MatSort;
	@Input() data: any;

	currentDate: string;


	constructor(datePipe: DatePipe,
				public dialog: MatDialog) {
		this.currentDate = datePipe.transform(new Date(Date.now()), 'yyyy-MM-dd');

	}

	ngOnDestroy(): void {
	}

	ngOnInit(): void {
		this.dataSource = new MatTableDataSource<Reviewer>(this.data);
	}


	getItemStatusString(reviewDue: string = ''): string {
		if (reviewDue < this.currentDate) {
			return 'overdue';
		} else if (reviewDue > this.currentDate) {
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
		} else if (reviewDue > this.currentDate) {
			return 'success';
		} else {
			return '';
		}
	}

	/**
	 * Returns item condition
	 *
	 * @param condition: number
	 */
	getItemConditionString(condition: number = 0): string {
		switch (condition) {
			case 0:
				return 'New';
			case 1:
				return 'Used';
		}
		return '';
	}

	/**
	 * Returns CSS Class name by condition
	 *
	 * @param condition: number
	 */
	getItemCssClassByCondition(condition: number = 0): string {
		switch (condition) {
			case 0:
				return 'success';
			case 1:
				return 'info';
		}
		return '';
	}

	openDialog() {
		const dialogRef = this.dialog.open(Modal3Component, {height: '350px'});

		dialogRef.afterClosed().subscribe(result => {
			console.log(`Dialog result: ${result}`);
		});
	}
}

@Component({
	selector: 'kt-modal3',
	template: `

		<div class="col-xl-12">
			<div class="col-xl-12">
				<div class="kt-modal3__container">
				<mat-toolbar>
					  <mat-toolbar-row>
						<span>List of Reviewers</span>
					  </mat-toolbar-row>
				</mat-toolbar>
<!--					<h2 mat-dialog-title>List of Reviewers</h2>-->
					<mat-dialog-content>
						<mat-selection-list multiple="'false'">
							<mat-list-option >Reviewer 1</mat-list-option>
							<mat-list-option >Reviewer 2</mat-list-option>
							<mat-list-option >Reviewer 3</mat-list-option>
						</mat-selection-list>

					</mat-dialog-content>
					<mat-dialog-actions>
						<button class="mat-raised-button" (click)="close()">Close</button>
						<button class="btn btn-primary " (click)="save()">Switch</button>
					</mat-dialog-actions>
				</div>
			</div>
		</div>

		`,
})
export class Modal3Component implements OnInit {


	constructor(private dialogRef: MatDialogRef<Modal3Component>) {
	}

	ngOnInit() {
	}

	close() {
		this.dialogRef.close();
	}

	save() {

	}
}
