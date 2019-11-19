import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkListComponent } from './work-list/work-list.component';
import {RouterModule, Routes} from "@angular/router";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {PortletModule} from "../../partials/content/general/portlet/portlet.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSortModule} from "@angular/material/sort";
import {MatCardModule} from "@angular/material/card";
import {WidgetModule} from "../../partials/content/widgets/widget.module";
import {PartialsModule} from "../../partials/partials.module";

const routes: Routes = [
	{
		path: '',
		component: WorkListComponent
	}
]



@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		MatPaginatorModule,
		MatProgressSpinnerModule,
		PortletModule,
		MatFormFieldModule,
		MatTableModule,
		MatIconModule,
		MatCheckboxModule,
		MatSortModule,
		MatCardModule,
		WidgetModule,
		PartialsModule
	],
	exports: [RouterModule],

	declarations: [WorkListComponent]

})
export class PublicPageModule { }