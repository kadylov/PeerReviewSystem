// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
import {MatFormFieldModule, MatRadioModule, MatSliderModule} from '@angular/material';
import {RouterModule, Routes} from '@angular/router';
import {BaseComponent} from '../theme/base/base.component';
import {ErrorPageComponent} from '../theme/content/error-page/error-page.component';
import {ThemeModule} from '../theme/theme.module';

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
	],
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
        MatSliderModule
    ],
	providers: []
})
export class PagesModule {
}
