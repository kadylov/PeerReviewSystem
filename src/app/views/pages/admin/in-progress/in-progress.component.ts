import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';



@Component({
	selector: 'kt-in-progress',
	templateUrl: './in-progress.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [`
	.example-container {
		display: flex;
		flex-direction: column;
	}
	.example-full-width {
		width: 100%;
	  }
	 .kt-checkbox-inline > mat-checkbox {
		 padding-right: 20px;
	 }
	`]
})
export class InProgressComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
