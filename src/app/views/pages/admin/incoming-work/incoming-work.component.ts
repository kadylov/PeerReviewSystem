import { Component, OnInit } from '@angular/core';
import {User1} from '../../../../core/auth/_models/user1.model';
import {MessageType} from '../../../../core/_base/crud';
import {FormBuilder, Validators} from '@angular/forms';
import {Work} from '../../../author/model/work';
import {IncomingWorkModel} from '../../../../core/_base/layout/models/incoming-work.model';
import {WorkService} from '../../../author/service/work.service';
import {IncomingWorkService} from './incoming-work.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';



@Component({
  selector: 'kt-incoming-work',
  templateUrl: './incoming-work.component.html',
  styleUrls: ['./incoming-work.component.scss']
})


export class IncomingWorkComponent implements OnInit {
	workForm: any;
	PreReviewValue: string = "admitted";
	PreReviewDate: string = "2019-12-11";
	PreReviewAdminID: string = "6";
	PreReviewWorkID: string = "2";
	PreReviewNote: string = "";
	private hasFormErrors: boolean;

	myDate = new Date();

  constructor(
	  private fb: FormBuilder,
	  private snackBar: MatSnackBar,
	  private router: Router,

	  private incomingWorkService: IncomingWorkService
  ) { }

  ngOnInit() {

	  this.initWorkForm();

  }



	/**
	* Form initalization
	* Default params, validators
	*/
	initWorkForm() {
		this.workForm = this.fb.group({
			AdminID: ['', Validators.compose([
				Validators.required,
			])
			],
			WorkID: ['', Validators.compose([
				// Validators.required,
			])
			],
			DateReviewed: ['', Validators.compose([
				// Validators.required,
			])
			],
			Decision: ['', Validators.compose([
				// Validators.required,
			])
			],
			RejectNote: ['', Validators.compose([
				// Validators.required,
			])
			],
		});
	}


	/**
	 * Form Submit
	 */
	submit() {



		let adminReview: IncomingWorkModel = new IncomingWorkModel();
		adminReview.AdminID = 0;
		adminReview.WorkID = 27;
		adminReview.DateReviewed = "2020-03-10";
		adminReview.Decision = "rejected";
		adminReview.RejectNote = "Poor grammars";




		console.log(adminReview);

		const message = 'Your Work has been submitted successfully!';

		this.incomingWorkService.submit(adminReview).subscribe(
			res=>{

				this.snackBar.open(message, '', {duration: 4000});
				this.router.navigateByUrl('/dashboard');

			}
		);
	}





}

