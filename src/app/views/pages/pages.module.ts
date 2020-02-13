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
import {MatFormFieldModule, MatRadioModule} from '@angular/material';


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
		HttpClientModule,
		FormsModule,
		CoreModule,
		PartialsModule,
		UserManagementModule,
		PublicPageModule,
		MatRadioModule,
		MatFormFieldModule,
	],
	providers: []
})
export class PagesModule {
}
