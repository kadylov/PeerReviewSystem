import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScorecardComponent} from './scorecard/scorecard.component';
import {WorkComponent} from './work/work.component';
import {ReviewerPageComponent} from './reviewer-page/reviewer-page.component';
import {RouterModule, Routes} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";


const routes: Routes =[
	{
		path: '',
		component: ReviewerPageComponent
	}
]

@NgModule({
	/**/ exports: [RouterModule],
	declarations: [ScorecardComponent, WorkComponent, ReviewerPageComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),

	]
})
export class ReviewerModule {
}
