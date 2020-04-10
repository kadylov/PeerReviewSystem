// Angular
import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// Components
import {BaseComponent} from './views/theme/base/base.component';
import {ErrorPageComponent} from './views/theme/content/error-page/error-page.component';
// Auth
import {AuthGuard} from './core/auth';

// Admin Parts

const routes: Routes = [

	// Public user
	{path: '', redirectTo: 'home', pathMatch: 'full'},
	{path: 'home', loadChildren: () => import('app/views/main/main.module').then(m => m.MainModule)},

	{path: 'auth', loadChildren: () => import('app/views/auth/auth.module').then(m => m.AuthModule)},
	// {path: 'home', loadChildren: () => import('app/views/public-page/public-page.module').then(m => m.PublicPageModule)},
	{path: 'author', loadChildren: () => import('app/views/author/author.module').then(m => m.AuthorModule)},

	{path: 'reviewer', loadChildren: () => import('app/views/reviewer-pages/r_pages.module').then(m => m.ReviewerPagesModule)},
	{path: 'admin', loadChildren: () => import('app/views/pages/pages.module').then(m => m.PagesModule)},

	// {path: 'prs', loadChildren: () => import('app/views/company-info-page/company.module').then(m => m.CompanyModule)},



];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
