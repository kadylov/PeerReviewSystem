import {MatSort, MatTableDataSource} from '@angular/material';
import {Reviewer, ReviewInProgressModel} from '../../../../core/admin/_models/review-in-progress.model';
import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DatePipe} from '@angular/common';



@Component({
		selector: 'assigned-work-table',
		templateUrl: './assigned-work.component.html'
	}
)
export class AssignedListComponent implements OnInit, OnDestroy {


	dataSource: MatTableDataSource<Reviewer>;
	displayedColumns = ['id','Reviewer', 'DueDate', 'Status'];

	@ViewChild(MatSort, {static: true}) sort: MatSort;
	@Input() data: any;

	currentDate: string;


	constructor(datePipe: DatePipe) {
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
}
