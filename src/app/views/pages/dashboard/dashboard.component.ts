// Angular
import { Component, OnInit } from '@angular/core';
// Lodash
import { shuffle } from 'lodash';
// Services
// Widgets model
import { LayoutConfigService, SparklineChartOptions } from '../../../core/_base/layout';
import { Widget4Data } from '../../partials/content/widgets/widget4/widget4.component';

@Component({
	selector: 'kt-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
	chartOptions1: SparklineChartOptions;


	constructor(private layoutConfigService: LayoutConfigService) {
	}

	ngOnInit(): void {
		this.chartOptions1 = {
			data: [10, 14, 18, 11, 9, 12, 14, 17, 18, 14],
			color: this.layoutConfigService.getConfig('colors.state.brand'),
			border: 3
		};


	}
}
