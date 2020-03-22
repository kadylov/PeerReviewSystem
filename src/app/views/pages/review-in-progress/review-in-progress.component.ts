import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ReviewInProgressModel} from '../../../core/admin/_models/review-in-progress.model';
import {AdminService} from '../../../core/admin/_services/admin.service';


@Component({
		selector: 'kt-review-in-progress',
		templateUrl: './review-in-progress.component.html'
	}
)
export class ReviewInProgressComponent implements OnInit {

	reviewInProgress$: Observable<ReviewInProgressModel[]>;

	constructor(private adminService: AdminService) {}

	ngOnInit(): void {
		this.reviewInProgress$ = this.adminService.getAllAssignedWorks();
	}

	combineArrays(lhs: string[], rhs: string[]) {
		let reviewers = {};
		lhs.forEach((key, i) => reviewers[key] = rhs[i]);
		return reviewers;
	}

}
