import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthNoticeService} from '../../../core/auth';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {Router} from '@angular/router';
import {EmailService} from '../../../core/email-notification/_services/email.service';
import {Email} from '../../../core/email-notification/_models/email.model';
import {Subscription} from 'rxjs';


@Component({
	selector: 'kt-contact1',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ContactComponent implements OnInit, OnDestroy {

	subscription: Subscription;

	loading: any;

	contactForm: FormGroup;


	constructor(
		private authNoticeService: AuthNoticeService,
		private fb: FormBuilder,
		private snackBar: MatSnackBar,
		private router: Router,

		private emailService:EmailService
	) {
	}


	ngOnInit() {
		this.initContactForm();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
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
			return;
		}


		let senderName = controls['fullname'].value;
		let senderEmail = controls['email'].value;
		let subject = controls['subject'].value;
		let cmessage = controls['cmessage'].value;

		let email:Email={
			senderName: senderName,
			senderEmail: senderEmail,
			subject:subject,
			message: cmessage
		};
		this.subscription= this.emailService.sendEmail(email).subscribe(
			error => {
				this.displaySnackBar("Unable to submit your message.");
				return;
			}
		);

		this.resetForm();
		this.displaySnackBar('Your message has been submitted successfully.');
		this.router.navigateByUrl('/home');

		return;

	}

	initContactForm() {
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
			subject: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(320)
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


	private displaySnackBar(message: string) {
		let config = new MatSnackBarConfig();
		config.duration = 5000;
		config.panelClass = ['d-flex', 'justify-content-center', 'snackbar2'];
		this.snackBar.open(message, '', config);
	}

	private resetForm() {
		this.contactForm.reset();
		Object.keys(this.contactForm.controls).forEach(key => {
			this.contactForm.get(key).setErrors(null);
		});
	}

}
