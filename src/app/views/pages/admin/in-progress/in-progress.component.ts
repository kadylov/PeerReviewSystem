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
	.mat-slider {
		width: 75%;
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

	q1Value = 0;
	q2Value = 0;
	q3Value = 0;
	q4Value = 0;
	q5Value = 0;
	q6Value = 0;
	q7Value = 0;
	q8Value = 0;
	q9Value = 0;
	q10Value = 0;
	q11Value = 0;
	q12Value = 0;
	cValue = 0;
	changeSlider() {
		console.log('q1Value:', this.q1Value);
		console.log('q2Value:', this.q2Value);
		console.log('q3Value:', this.q3Value);
		console.log('q4Value:', this.q4Value);
		console.log('q5Value:', this.q5Value);
		console.log('q6Value:', this.q6Value);
		console.log('q7Value:', this.q7Value);
		console.log('q8Value:', this.q8Value);
		console.log('q9Value:', this.q9Value);
		console.log('q10Value:', this.q10Value);
		console.log('q11Value:', this.q11Value);
		console.log('q12Value:', this.q12Value);
		this.cValue = this.q1Value + this.q2Value + this.q3Value + this.q4Value + this.q5Value + this.q6Value + this.q7Value + this.q8Value + this.q9Value + this.q10Value + this.q11Value + this.q12Value;
		console.log('cValue:', this.cValue);
	}

	constructor() { }

	ngOnInit() {


	}

}

