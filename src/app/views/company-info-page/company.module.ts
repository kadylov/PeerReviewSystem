// Angular
import { ModuleWithProviders, NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {AboutComponent} from './about-page/about.component';
import {ContactComponent} from './contact-page/contact.component';
import {MatFormFieldModule, MatInputModule} from '@angular/material';
import {PartialsModule} from '../partials/partials.module';
import {CompanyComponent} from './company.component';
import {AuthModule} from '../auth/auth.module';
// Material

const routes: Routes = [
	{
		path: '',
		component: CompanyComponent,
		children: [
			{
				path: '',
				redirectTo: 'about',
				pathMatch: 'full'
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
        RouterModule.forChild(routes),
        MatFormFieldModule,
        ReactiveFormsModule,
        PartialsModule,
        FormsModule,
        CommonModule,
        MatInputModule,
        AuthModule
    ],
	providers: [
	],
	exports: [CompanyComponent],
	declarations: [
		CompanyComponent,
		AboutComponent,
		ContactComponent,
	]
})

export class CompanyModule {
}
