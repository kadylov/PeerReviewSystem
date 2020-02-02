// Angular
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
// Material
import {
	MatAutocompleteModule,
	MatButtonModule,
	MatCheckboxModule, MatChipsModule, MatDatepickerModule,
	MatFormFieldModule, MatIconModule,
	MatInputModule,
	MatSelectModule
} from '@angular/material';
// NGRX
// Module components
import { AuthorComponent } from './author.component';
import { SubmissionFormComponent } from './submission-form/submission-form.component';
import { AuthNoticeComponent } from './auth-notice/auth-notice.component';
// Auth

const routes: Routes = [
	{
		path: '',
		component: AuthorComponent,
		children: [
			{
				path: '',
				redirectTo: 'submission',
				pathMatch: 'full'
			},
			{
				path: 'submission',
				component: SubmissionFormComponent,
				data: {returnUrl: window.location.pathname}
			},
		]
	}
];


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		RouterModule.forChild(routes),
		MatInputModule,
		MatFormFieldModule,
		MatCheckboxModule,
		MatAutocompleteModule,
		MatSelectModule,
		MatDatepickerModule,
		MatChipsModule,
		MatIconModule,
	],
	providers: [
	],
	exports: [AuthorComponent, AuthNoticeComponent],
	declarations: [
		AuthorComponent,
		SubmissionFormComponent,
		AuthNoticeComponent
	]
})

export class AuthorModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: AuthorModule,
			providers: [
			]
		};
	}
}
