import {Component, OnDestroy, OnInit} from '@angular/core';
import {LayoutConfigService, MenuConfigService, PageConfigService, SparklineChartOptions} from '../../../core/_base/layout';
import {Widget4Data} from '../../partials/content/widgets/widget4/widget4.component';
import {shuffle} from 'lodash';

@Component({
	selector: 'kt-reviewer-dashboard',
	templateUrl: './r_dashboard.component.html',
	styleUrls: ['./r_dashboard.component.scss']
})
export class R_DashboardComponent implements OnInit{


	constructor(private layoutConfigService: LayoutConfigService) {
	}

	ngOnInit(): void {

	}
}
