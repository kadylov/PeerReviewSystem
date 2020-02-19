// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Partials
import { PartialsModule } from '../partials/partials.module';
// Pages
import { CoreModule } from '../../core/core.module';
import {AssignedWorkComponent} from './assigned-work/assigned-work.component';
import {RouterModule, Routes} from '@angular/router';
import { ReviewComponent } from './reviews/review.component';
import {ReviewerBaseComponent} from '../theme/reviewer-base/reviewer-base.component';
import {R_DashboardComponent} from './dashboard/r_dashboard.component';
import {ThemeModule} from '../theme/theme.module';
import {BaseComponent} from '../theme/base/base.component';
import {MenuAsideService, MenuHorizontalService, SubheaderService} from '../../core/_base/layout';


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
				component: ReviewComponent,
			},

		]
	}
];

@NgModule({
	declarations: [
		AssignedWorkComponent,
		ReviewComponent,
		R_DashboardComponent
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
		ThemeModule
	],

	providers: [


	]
})
export class ReviewerPagesModule {
}
