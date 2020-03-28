import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthNoticeService} from '../../../core/auth';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {Router} from '@angular/router';


@Component({
	selector: 'kt-contact1',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ContactComponent implements OnInit {
	loading: any;

	contactForm: FormGroup;


	constructor(
		private authNoticeService: AuthNoticeService,
		private fb: FormBuilder,
		private snackBar: MatSnackBar,
		private router:Router,

	) {
	}


	ngOnInit() {
		this.initContactForm();
	}

	isControlHasError(controlName: string, validationType: string) {
		const control = this.contactForm.controls[controlName];
		if (!control) {
			return false;
		}
		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}

	submit() {
		const controls = this.contactForm.controls;
		if (this.contactForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.loading = false;
		}


			let fullname = controls['fullname'].value;
			let email = controls['email'].value;
			let cmessage = controls['cmessage'].value;

		this.displaySnackBar('Your message has been submitted!');

		this.router.navigateByUrl('/home');
			return;

	}

	initContactForm() {
		// demo message to show

		this.contactForm = this.fb.group({
			fullname: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(320)
			])
			],
			email: ['', Validators.compose([
				Validators.required,
				Validators.email,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			],
			cmessage: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			]
		});
	}


	displaySnackBar(message: string) {
		let config = new MatSnackBarConfig();
		config.duration = 5000;
		config.panelClass = ['d-flex','justify-content-center','snackbar2'];
		this.snackBar.open(message, '', config);
	}

}
