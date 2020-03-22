import {Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {Observable, Subscription} from 'rxjs';
import {ReviewInProgressModel} from '../../../core/admin/_models/review-in-progress.model';
import {AdminService} from '../../../core/admin/_services/admin.service';
import {DatePipe} from '@angular/common';


@Component({
		selector: 'kt-review-in-progress',
		templateUrl: './review-in-progress.component.html'
	}
)
export class ReviewInProgressComponent implements OnInit, OnDestroy {


	// Subscriptions
	private wSub: Subscription;
	panelOpenState: boolean = false;



	// reviewInProgress: ReviewInProgressModel[];

	reviewInProgress$: Observable<ReviewInProgressModel[]>;

	constructor(private adminService: AdminService) {}

	ngOnInit(): void {
		this.reviewInProgress$ = this.adminService.getAllAssignedWorks();
	}

	ngOnDestroy(): void {
		this.wSub.unsubscribe();
	}

	combineArrays(lhs: string[], rhs: string[]) {
		let reviewers = {};
		lhs.forEach((key, i) => reviewers[key] = rhs[i]);
		return reviewers;
	}

}
