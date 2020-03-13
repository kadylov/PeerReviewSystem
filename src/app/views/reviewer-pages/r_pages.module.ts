// Angular
import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
// Partials
import {PartialsModule} from '../partials/partials.module';
// Pages
import {CoreModule} from '../../core/core.module';
import {AssignmentHistoryComponent} from './assignment-history/assignment-history.component';
import {RouterModule, Routes} from '@angular/router';
import {ReviewHistoryComponent} from './review-history/review-history.component';
import {ReviewerBaseComponent} from '../theme/reviewer-base/reviewer-base.component';
import {R_DashboardComponent} from './dashboard/r_dashboard.component';
import {ThemeModule} from '../theme/theme.module';
import {ReviewerService} from '../../core/reviewer/_services/reviewer.service';
import {MatButtonModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {StoreModule} from '@ngrx/store';

import {EffectsModule} from '@ngrx/effects';
import {ReviewHistoryEffects} from '../../core/reviewer/_effects/review-history.effects';
import {reducers} from '../../core/reviewer/_reducers';
import {AssignmentEffects} from '../../core/reviewer/_effects/assignment.effects';
import {AssignmentComponent} from './assignment/assignment.component';
import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DiscussionComponent} from './discussion/discussion.component';
import {MessageEffects} from '../../core/reviewer/_effects/message.effects';


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
				path: 'assignment_history',
				component: AssignmentHistoryComponent,
			},
			{
				path: 'reviews',
				component: ReviewHistoryComponent,
			},

			{
				path: 'assignment',
				component: AssignmentComponent,
			},

		]
	}
];

@NgModule({
	declarations: [
		AssignmentHistoryComponent,
		ReviewHistoryComponent,
		R_DashboardComponent,
		AssignmentComponent,
		DiscussionComponent,
	],


	exports: [
		// DiscussionComponent
	],
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
		NgbModule,


		StoreModule.forFeature('reviewer', reducers
		),
		EffectsModule.forFeature([ReviewHistoryEffects, AssignmentEffects, MessageEffects]),
		MatButtonModule,
		MatIconModule,
	],

	providers: [
		ReviewerService,
		NgbModal,
		DatePipe

	]
})
export class ReviewerPagesModule {
}
