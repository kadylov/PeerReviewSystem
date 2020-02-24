// Angular
import { ModuleWithProviders, NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
// Material
import {
	MatAutocompleteModule,
	MatButtonModule,
	MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDividerModule,
	MatFormFieldModule, MatGridListModule, MatIconModule,
	MatInputModule,
	MatSelectModule, MatSliderModule
} from '@angular/material';
import { AuthorComponent } from './author.component';
import { SubmissionFormComponent } from './submission-form/submission-form.component';
import { AuthNoticeComponent } from './auth-notice/auth-notice.component';
import {NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';
import {TagsComponent} from './tag-selections/tags.component';
import {TagService} from '../../core/author/_services/tag.service';
import { FocusDirective } from './directive/focus.directive';

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
				// component: TagsComponent,

				// data: {returnUrl: window.location.pathname}
			},

			{
				path: 'tags',
				component: TagsComponent,
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
		MatDividerModule,
		NgbTabsetModule,
		MatGridListModule,
		MatSliderModule,
	],
	providers: [
		TagService,
		DatePipe
	],
	exports: [AuthorComponent, AuthNoticeComponent],
	declarations: [
		AuthorComponent,
		SubmissionFormComponent,
		AuthNoticeComponent,
		TagsComponent,
		FocusDirective,
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
