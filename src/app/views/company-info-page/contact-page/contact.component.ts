import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/auth/_services';
import {AuthNoticeService} from '../../../core/auth';


@Component({
	selector: 'kt-contact1',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit{
	firstName: FormControl;
	lastName: FormControl;
	email: FormControl;
	textField: FormControl;
	loading: any;

	loginForm: FormGroup;



	constructor(
		private auth: AuthService,
		private authNoticeService: AuthNoticeService,
		private fb: FormBuilder,
	) {
	}


	ngOnInit() {
		this.initLoginForm()
	}

	isControlHasError(title: string, required: string) {

	}

	submit() {

	}

	initLoginForm() {
		// demo message to show

		this.loginForm = this.fb.group({
			username: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(320) // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
			])
			],
			password: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			],
			message: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			]
		});
	}

}
