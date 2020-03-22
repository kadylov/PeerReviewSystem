// Angular
import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Partials
import { PartialsModule } from '../partials/partials.module';
// Pages
import { CoreModule } from '../../core/core.module';

import { UserManagementModule } from './user-management/user-management.module';
import { IncomingWorkComponent } from './admin/incoming-work/incoming-work.component';
import { AssignmentComponent } from './admin/assignment/assignment.component';
import { ScorecardComponent } from './admin/scorecard/scorecard.component';
import { ResultComponent } from './admin/result/result.component';
import { InProgressComponent } from './admin/in-progress/in-progress.component';
import { CompletedReviewComponent } from './admin/completed-review/completed-review.component';


import {PublicPageModule} from "../public-page/public-page.module";
import {
	MatButtonModule, MatDialogModule,
	MatExpansionModule,
	MatFormFieldModule,
	MatPaginatorModule,
	MatRadioModule,
	MatSliderModule,
	MatSortModule,
	MatTableModule
} from '@angular/material';
import {RouterModule, Routes} from '@angular/router';
import {BaseComponent} from '../theme/base/base.component';
import {ErrorPageComponent} from '../theme/content/error-page/error-page.component';
import {ThemeModule} from '../theme/theme.module';
import {IncomingDatatable} from './admin/incoming-datatable/incomingDatatable.component';
import {ReviewInProgressComponent} from './review-in-progress/review-in-progress.component';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AssignedListComponent, Modal3Component} from './review-in-progress/assigned-works/assigned-work.component';

const routes:Routes=[
	{
		path: '',
		component: BaseComponent,
		children: [

			{
				path: '',
				redirectTo: 'dashboard',
				pathMatch: 'full'
			},

			// Admin page routing
			{
				path: 'incoming-work',
				component: IncomingWorkComponent
			},
			{
				path: 'assignment',
				component: AssignmentComponent
			},
			{
				path: 'scorecard',
				component: ScorecardComponent
			},
			{
				path: 'result',
				component: ResultComponent
			},
			{
				path: 'in-progress',
				component: InProgressComponent
			},
			{
				path: 'review-in-progress',
				component: ReviewInProgressComponent
			},
			{
				path: 'completed-review',
				component: CompletedReviewComponent
			},

			{
				path: 'dashboard',
				loadChildren: () => import('app/views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
			},
			{
				path: 'user-management',
				loadChildren: () => import('app/views/pages/user-management/user-management.module').then(m => m.UserManagementModule)
			},
			{
				path: 'error/403',
				component: ErrorPageComponent,
				data: {
					'type': 'error-v6',
					'code': 403,
					'title': '403... Access forbidden',
					'desc': 'Looks like you don\'t have permission to access for requested page.<br> Please, contact administrator'
				}
			},
			{path: 'error/:type', component: ErrorPageComponent},
			// {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
			// {path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
			{path: '', redirectTo: 'dashboard', pathMatch: 'full'},
			{path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
		]
	},
]

@NgModule({
	declarations: [
		IncomingWorkComponent,
		AssignmentComponent,
		ScorecardComponent,
		ResultComponent,
		InProgressComponent,
		CompletedReviewComponent,
		IncomingDatatable,
		ReviewInProgressComponent,
		AssignedListComponent,
		Modal3Component
	],
	entryComponents: [Modal3Component],

	exports: [
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),  //////
		HttpClientModule,
		FormsModule,
		CoreModule,
		PartialsModule,
		UserManagementModule,
		PublicPageModule,
		MatRadioModule,
		MatFormFieldModule,
		ThemeModule,
		MatSliderModule,
		ReactiveFormsModule,
		MatTableModule,
		MatPaginatorModule,
		MatSortModule,
		PerfectScrollbarModule,
		NgbModule,
		MatExpansionModule,
		MatButtonModule,
		MatDialogModule
	],
	providers: [DatePipe]
})
export class PagesModule {
}
