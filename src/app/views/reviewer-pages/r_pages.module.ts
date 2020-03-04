// Angular
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
// Partials
import {PartialsModule} from '../partials/partials.module';
// Pages
import {CoreModule} from '../../core/core.module';
import {AssignedWorkComponent} from './assigned-work/assigned-work.component';
import {RouterModule, Routes} from '@angular/router';
import {ReviewHistoryComponent} from './review-history/review-history.component';
import {ReviewerBaseComponent} from '../theme/reviewer-base/reviewer-base.component';
import {R_DashboardComponent} from './dashboard/r_dashboard.component';
import {ThemeModule} from '../theme/theme.module';
import {ReviewerService} from '../../core/reviewer/_services/reviewer.service';
import {MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {StoreModule} from '@ngrx/store';

import {EffectsModule} from '@ngrx/effects';
import {ReviewHistoryEffects} from '../../core/reviewer/_effects/review-history.effects';
import {reviewHistoryReducer} from '../../core/reviewer/_reducers/review-history.reducers';


const routes: Routes = [
	{
		path: '',
		component: ReviewerBaseComponent,
		children: [
			{
				path: '',
				redirectTo: 'dashboard',
				pathMatch: 'full'
			},
			{
				path: 'dashboard',
				component: R_DashboardComponent,
			},
			{
				path: 'assignments',
				component: AssignedWorkComponent,
			},
			{
				path: 'reviews',
				component: ReviewHistoryComponent,
			},

		]
	}
];

@NgModule({
	declarations: [
		AssignedWorkComponent,
		ReviewHistoryComponent,
		R_DashboardComponent
	],
	exports: [],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),  //////
		HttpClientModule,
		FormsModule,
		CoreModule,
		PartialsModule,
		ThemeModule,
		MatInputModule,
		PerfectScrollbarModule,
		MatTableModule,
		MatSortModule,
		MatPaginatorModule,

		StoreModule.forFeature('reviewHist1',reviewHistoryReducer
		),
		EffectsModule.forFeature([ReviewHistoryEffects]),
	],

	providers: [
		ReviewerService

	]
})
export class ReviewerPagesModule {
}
