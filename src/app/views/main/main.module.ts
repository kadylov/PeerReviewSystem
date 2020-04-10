import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MainComponent} from './main.component';
import {PublicPageComponent} from '../public-page/public-page.component';
import {AboutComponent} from './about-page/about.component';
import {ContactComponent} from './contact-page/contact.component';
import {ReactiveFormsModule} from '@angular/forms';
import {
	MatButtonModule,
	MatChipsModule,
	MatIconModule,
	MatInputModule,
	MatProgressSpinnerModule,
	MatToolbarModule
} from '@angular/material';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PortletModule} from '../partials/content/general/portlet/portlet.module';

const routes: Routes = [
	{
		path: '',
		component: MainComponent,
		children: [
			{
				path: '',
				redirectTo: 'public',
				pathMatch: 'full'
			},
			{
				path: 'public',
				component: PublicPageComponent,
			},
			{
				path: 'about',
				component: AboutComponent,
			},

			{
				path: 'contact',
				component: ContactComponent,
			},
		]
	}
];


@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		MatPaginatorModule,
		MatProgressSpinnerModule,
		MatFormFieldModule,
		MatTableModule,
		MatIconModule,
		MatSortModule,
		MatInputModule,
		MatToolbarModule,
		MatChipsModule,
		MatButtonModule,
		ReactiveFormsModule,
		PerfectScrollbarModule,
		PortletModule
	],
	providers: [],
	exports: [],
	declarations: [
		MainComponent,
		AboutComponent,
		ContactComponent,
		PublicPageComponent,
	]
})

export class MainModule {
}
