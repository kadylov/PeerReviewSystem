// Angular
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// Components
import {BaseComponent} from './views/theme/base/base.component';
import {ErrorPageComponent} from './views/theme/content/error-page/error-page.component';
// Auth
import {AuthGuard} from './core/auth';

// Admin Parts
import {IncomingWorkComponent} from './views/pages/admin/incoming-work/incoming-work.component';
import {AssignmentComponent} from './views/pages/admin/assignment/assignment.component';
import {CompletedReviewComponent} from './views/pages/admin/completed-review/completed-review.component';
import {ScorecardComponent} from './views/pages/admin/scorecard/scorecard.component';
import {ResultComponent} from './views/pages/admin/result/result.component';
import {InProgressComponent} from './views/pages/admin/in-progress/in-progress.component';
import {AssignedWorkComponent} from './views/reviewer-pages/assigned-work/assigned-work.component';
import {AuthComponent} from './views/auth/auth.component';
import {SubmissionFormComponent} from './views/author/submission-form/submission-form.component';
import {ReviewerBaseComponent} from './views/theme/reviewer-base/reviewer-base.component';
import {ReviewComponent} from './views/reviewer-pages/reviews/review.component';
import {AboutComponent} from './views/about-page/about.component';
import {ContactComponent} from './views/contact-page/contact.component';

const routes: Routes = [
	{path: 'auth', loadChildren: () => import('app/views/auth/auth.module').then(m => m.AuthModule)},
	{path: 'home', loadChildren: () => import('app/views/public-page/public-page.module').then(m => m.PublicPageModule)},
	{path: 'author', loadChildren: () => import('app/views/author/author.module').then(m => m.AuthorModule)},

	{path: 'reviewer', loadChildren: () => import('app/views/reviewer-pages/r_pages.module').then(m => m.ReviewerPagesModule)},
	{path: 'admin', loadChildren: () => import('app/views/pages/pages.module').then(m => m.PagesModule)},

	{path:'about', component: AboutComponent},
	{path:'contact', component: ContactComponent},

	// Public user
	{path: '', redirectTo: 'home', pathMatch: 'full'},

	// Reviewer Dashboard
	// {
	// 	path: 'reviewer',
	// 	component: BaseComponent,
	// 	// canActivate: [AuthGuard],
	// 	children: [
	//
	// 		// Reviewer page routing
	//
	// 		{
	// 			path: 'dashboard',
	// 			loadChildren: () => import('app/views/reviewer-pages/dashboard/r_dashboard.module').then(m => m.R_dashboardModule)
	// 		},
	// 		{
	// 			path: 'assignments',
	// 			component: AssignedWorkComponent
	// 		},
	// 		{
	// 			path: 'reviews',
	// 			component: ReviewComponent
	// 		},
	// 		{
	// 			path: 'error/403',
	// 			component: ErrorPageComponent,
	// 			data: {
	// 				'type': 'error-v6',
	// 				'code': 403,
	// 				'title': '403... Access forbidden',
	// 				'desc': 'Looks like you don\'t have permission to access for requested page.<br> Please, contact administrator'
	// 			}
	// 		},
	// 		{path: 'error/:type', component: ErrorPageComponent},
	// 		// {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
	// 		// {path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
	// 		{path: '**', redirectTo: 'home', pathMatch: 'full'}
	// 	]
	// },

	// {
	// 	path: 'admin',
	// 	component: BaseComponent,
	// 	// canActivate: [AuthGuard],
	// 	children: [
	//
	// 		// Admin page routing
	// 		{
	// 			path: 'incoming-work',
	// 			component: IncomingWorkComponent
	// 		},
	// 		{
	// 			path: 'assignment',
	// 			component: AssignmentComponent
	// 		},
	// 		{
	// 			path: 'scorecard',
	// 			component: ScorecardComponent
	// 		},
	// 		{
	// 			path: 'result',
	// 			component: ResultComponent
	// 		},
	// 		{
	// 			path: 'in-progress',
	// 			component: InProgressComponent
	// 		},
	// 		{
	// 			path: 'completed-review',
	// 			component: CompletedReviewComponent
	// 		},
	//
	// 		{
	// 			path: 'dashboard',
	// 			loadChildren: () => import('app/views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
	// 		},
	// 		{
	// 			path: 'user-management',
	// 			loadChildren: () => import('app/views/pages/user-management/user-management.module').then(m => m.UserManagementModule)
	// 		},
	// 		{
	// 			path: 'error/403',
	// 			component: ErrorPageComponent,
	// 			data: {
	// 				'type': 'error-v6',
	// 				'code': 403,
	// 				'title': '403... Access forbidden',
	// 				'desc': 'Looks like you don\'t have permission to access for requested page.<br> Please, contact administrator'
	// 			}
	// 		},
	// 		{path: 'error/:type', component: ErrorPageComponent},
	// 		// {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
	// 		// {path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
	// 		{path: '', redirectTo: 'dashboard', pathMatch: 'full'},
	// 		{path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
	// 	]
	// },

];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
