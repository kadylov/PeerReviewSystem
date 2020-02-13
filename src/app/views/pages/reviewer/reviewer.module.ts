import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScorecardComponent} from './scorecard/scorecard.component';
import {WorkComponent} from './work/work.component';
import {ReviewerPageComponent} from './reviewer-page/reviewer-page.component';
import {RouterModule, Routes} from "@angular/router";
import {ThemeModule} from '../../theme/theme.module';
import {ReviewerComponent} from './reviewer.component';
import {PartialsModule} from '../../partials/partials.module';


const routes: Routes =[
	{
		path: '',
		component: ReviewerPageComponent
	}
]
@NgModule({

	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		ThemeModule,
		PartialsModule,


	],
	exports: [RouterModule],
	declarations: [
		ScorecardComponent,
		WorkComponent,
		ReviewerPageComponent,
		ReviewerComponent
	],

})
export class ReviewerModule {
}
