import {Component, OnDestroy, OnInit} from '@angular/core';
import {LayoutConfigService, MenuConfigService, PageConfigService, SparklineChartOptions} from '../../../core/_base/layout';
import {Widget4Data} from '../../partials/content/widgets/widget4/widget4.component';
import {shuffle} from 'lodash';
import {ReviewerService} from '../../../core/reviewer/_services/reviewer.service';
import {ReviewHistory} from '../../../core/reviewer/_models/review-history.model';
import {map} from 'rxjs/operators';
import {pipe} from 'rxjs';

@Component({
	selector: 'kt-reviewer-dashboard',
	templateUrl: './r_dashboard.component.html',
	styleUrls: ['./r_dashboard.component.scss']
})
export class R_DashboardComponent implements OnInit {


	constructor(private layoutConfigService: LayoutConfigService,
				private histservice: ReviewerService
	) {
	}

	ngOnInit(): void {
	}


	public testvar = [];

	test() {

		this.histservice.getCurrentAssignment(1)
			.subscribe(res => {
					this.testvar = res;
				}
			);
	}
}
