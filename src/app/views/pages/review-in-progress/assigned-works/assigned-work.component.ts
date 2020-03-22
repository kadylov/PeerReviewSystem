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
					<h2 mat-dialog-title>List of Reviewers</h2>
					<mat-dialog-content>

					</mat-dialog-content>
					<mat-dialog-actions>
						<button class="mat-raised-button" (click)="close()">Close</button>
						<button class="mat-raised-button mat-primary" (click)="save()">Save</button>
					</mat-dialog-actions>
				</div>
			</div>
		</div>

		<!--		<div class="col-xl-12">-->
		<!--			<div class="col-xl-12">-->
		<!--				<div class="kt-modal3__container">-->
		<!--					<h1 mat-dialog-title>Favorite Animal</h1>-->
		<!--					<h2 mat-dialog-title>Install Angular</h2>-->
		<!--					<mat-dialog-content>-->
		<!--						<h3>DEVELOP ACROSS ALL PLATFORMS</h3>-->
		<!--						<p>Learn one way to build applications with Angular and reuse your code and abilities to build-->
		<!--							apps for any deployment target. For web, mobile web, native mobile and native desktop.</p>-->
		<!--						<h3>SPEED &amp; PERFORMANCE</h3>-->
		<!--						<p>Achieve the maximum speed possible on the Web Platform today, and take it further, via Web-->
		<!--							Workers and server-side rendering. Angular puts you in control over scalability. Meet huge data requirements-->
		<!--							by building data models on RxJS, Immutable.js or another push-model.</p>-->
		<!--						<h3>INCREDIBLE TOOLING</h3>-->
		<!--						<p>Build features quickly with simple, declarative templates. Extend the template language with your own-->
		<!--							components and use a wide array of existing components. Get immediate Angular-specific help and feedback-->
		<!--							with nearly every IDE and editor. All this comes together so you can focus on building amazing apps rather-->
		<!--							than trying to make the code work.</p>-->
		<!--						<h3>LOVED BY MILLIONS</h3>-->
		<!--						<p>From prototype through global deployment, Angular delivers the productivity and scalable infrastructure-->
		<!--							that supports Google's largest applications.</p>-->
		<!--					</mat-dialog-content>-->
		<!--					<mat-dialog-actions>-->
		<!--						<button mat-button mat-dialog-close>Cancel</button>-->
		<!--						<button mat-button [mat-dialog-close]="true" cdkFocusInitial>Install</button>-->
		<!--					</mat-dialog-actions>-->
		<!--				</div>-->
		<!--			</div>-->
		<!--		</div>-->`,
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
