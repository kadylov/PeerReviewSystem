import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {R_DashboardComponent} from './r_dashboard.component';
import {PartialsModule} from '../../partials/partials.module';
import {CoreModule} from '../../../core/core.module';
import {AssignedWorkComponent} from '../assigned-work/assigned-work.component';

const routes: Routes = [
	{
		path: '',
		component: R_DashboardComponent,
		children: [
			{
				path: 'dashboard',
				component:R_DashboardComponent,
				pathMatch: 'full'
			},
		]


	},
]
@NgModule({
	imports: [
		CommonModule,
		PartialsModule,
		CoreModule,
		RouterModule.forChild(routes),
	],

	providers: [],
	declarations: [
		R_DashboardComponent,
	],

})
export class R_dashboardModule {
}
