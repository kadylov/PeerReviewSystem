// Angular
import {ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
// NGRX
import {Store} from '@ngrx/store';
import {AppState} from '../../../../core/reducers';
// Auth
import {AuthNoticeService, AuthService, Register, User} from '../../../../core/auth/';
import {Observable, Subject} from 'rxjs';
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {map, startWith} from 'rxjs/operators';

@Component({
	selector: 'kt-submission',
	templateUrl: './submission-form.component.html',
	styleUrls: ['./submission-form.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class SubmissionFormComponent implements OnInit, OnDestroy {

	@ViewChild('title', {static: true}) titleField: ElementRef;


	registerForm: FormGroup;
	loading = false;
	errors: any = [];

	minDate: Date = new Date(1991, 0, 1);
	maxDate: Date = new Date(Date.now());

	// Option field
	tagList = ['Standard', 'Brand Measurement', 'Outcome'];
	selectedTagList = [];

	private unsubscribe: Subject<any>; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/


	visible = true;
	selectable = true;
	removable = true;

	/**
	 * Component constructor
	 *
	 * @param authNoticeService: AuthNoticeService
	 * @param translate: TranslateService
	 * @param router: Router
	 * @param auth: AuthService
	 * @param store: Store<AppState>
	 * @param fb: FormBuilder
	 * @param cdr
	 */
	constructor(
		private authNoticeService: AuthNoticeService,
		private router: Router,
		private auth: AuthService,
		private store: Store<AppState>,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef
	)
	{
		this.unsubscribe = new Subject();



	}

	/**
	 * On init
	 */
	ngOnInit() {
		this.initRegisterForm();
		this.titleField.nativeElement.focus();
	}

	/*
    * On destroy
    */
	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	/**
	 * Form initalization
	 * Default params, validators
	 */
	initRegisterForm() {
		this.registerForm = this.fb.group({
			title: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			],
			date_written: ['', Validators.compose([
				Validators.required,
			]),
			],
			url: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			]),
			],
			author: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			],
			email: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			],
			tag: ['', Validators.compose([
				Validators.required,
			])
			],
		});
	}

	/**
	 * Form Submit
	 */
	submit() {
		const controls = this.registerForm.controls;

		// check form
		if (this.registerForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.loading = true;


		// const _user: User = new User();
		// _user.clear();
		// _user.email = controls['email'].value;
		// _user.username = controls['username'].value;
		// _user.fullname = controls['fullname'].value;
		// _user.password = controls['password'].value;
		// _user.roles = [];
		// this.auth.register(_user).pipe(
		// 	tap(user => {
		// 		if (user) {
		// 			this.store.dispatch(new Register({authToken: user.accessToken}));
		// 			// pass notice message to the login page
		// 			this.authNoticeService.setNotice(this.translate.instant('AUTH.REGISTER.SUCCESS'), 'success');
		// 			this.router.navigateByUrl('/auth/login');
		// 		} else {
		// 			this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
		// 		}
		// 	}),
		// 	takeUntil(this.unsubscribe),
		// 	finalize(() => {
		// 		this.loading = false;
		// 		this.cdr.markForCheck();
		// 	})
		// ).subscribe();
	}

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.registerForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}


	remove(tag: string): void {
		this.selectedTagList = this.selectedTagList.filter(t => t !== tag);
	}
}
