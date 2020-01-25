// Angular
import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// RxJS
import {Observable, Subject, Subscription} from 'rxjs';
import {finalize, takeUntil, tap} from 'rxjs/operators';
// Translate
import {TranslateService} from '@ngx-translate/core';
// Store
import {Store} from '@ngrx/store';
import {AppState} from '../../../../core/reducers';
// Auth
import {AuthNoticeService, AuthService, Login} from '../../../../core/auth';
import {User1} from "../../../../core/auth/_models/user1.model";

/**
 * ! Just example => Should be removed in development
 */
const DEMO_PARAMS = {
	USERNAME: 'admin',
	PASSWORD: '1234'
};

@Component({
	selector: 'kt-login',
	templateUrl: './login.component.html',
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {
	// Public params
	loginForm: FormGroup;
	loading = false;
	isLoggedIn$: Observable<boolean>;
	errors: any = [];

	private unsubscribe: Subject<any>;

	private wSub: Subscription = new Subscription();


	private returnUrl: any;
	private user: User1;

	// Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

	/**
	 * Component constructor
	 *
	 * @param router: Router
	 * @param auth: AuthService
	 * @param authNoticeService: AuthNoticeService
	 * @param translate: TranslateService
	 * @param store: Store<AppState>
	 * @param fb: FormBuilder
	 * @param cdr
	 * @param route
	 */
	constructor(
		private router: Router,
		private auth: AuthService,
		private authNoticeService: AuthNoticeService,
		private translate: TranslateService,
		private store: Store<AppState>,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		// private route: ActivatedRoute
	) {
		this.unsubscribe = new Subject();
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.initLoginForm();

		// redirect back to the returnUrl before login
		// this.route.queryParams.subscribe(params => {
		// 	this.returnUrl = params['returnUrl'] || '/';
		// });
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.authNoticeService.setNotice(null);
		// this.unsubscribe.next();
		// this.unsubscribe.complete();
		this.loading = false;

		// this.wSub.unsubscribe();
	}

	/**
	 * Form initalization
	 * Default params, validators
	 */
	initLoginForm() {
		// demo message to show
		if (!this.authNoticeService.onNoticeChanged$.getValue()) {
			const initialNotice = `Use account
			<strong>${DEMO_PARAMS.USERNAME}</strong> and password
			<strong>${DEMO_PARAMS.PASSWORD}</strong> to continue.`;
			this.authNoticeService.setNotice(initialNotice, 'info');
		}

		this.loginForm = this.fb.group({
			username: [DEMO_PARAMS.USERNAME, Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(320) // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
			])
			],
			password: [DEMO_PARAMS.PASSWORD, Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			]
		});
	}

	/**
	 * Form Submit
	 */
	// submit() {
	// 	const controls = this.loginForm.controls;
	// 	/** check form */
	// 	if (this.loginForm.invalid) {
	// 		Object.keys(controls).forEach(controlName =>
	// 			controls[controlName].markAsTouched()
	// 		);
	// 		return;
	// 	}
	//
	// 	this.loading = true;
	//
	// 	const authData = {
	// 		email: controls['email'].value,
	// 		password: controls['password'].value
	// 	};
	// 	this.auth
	// 		.login(authData.email, authData.password)
	// 		.pipe(
	// 			tap(user => {
	// 				if (user) {
	// 					this.store.dispatch(new Login({authToken: user.accessToken}));
	// 					this.router.navigateByUrl(this.returnUrl); // Main page
	// 				} else {
	// 					this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
	// 				}
	// 			}),
	// 			takeUntil(this.unsubscribe),
	// 			finalize(() => {
	// 				this.loading = false;
	// 				this.cdr.markForCheck();
	// 			})
	// 		)
	// 		.subscribe();
	// }

	submit() {

		const controls = this.loginForm.controls;
		/** check form */
		if (this.loginForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.loading = true;

		const authData = {
			username: controls['username'].value,
			password: controls['password'].value
		};

		/*
		*
		*
		* showConfig() {
		  this.configService.getConfig()
			.subscribe((data: Config) => this.config = {
				heroesUrl: data['heroesUrl'],
				textfile:  data['textfile']
			});
		}
		*
		* */

		this.wSub = this.auth
			.login(authData.username, authData.password).subscribe(
			res => {

				if (res.body != null) {
					this.user = res.body[0];
					console.log(res.body);
					console.log("user fullname: ", this.user.fullname);
					console.log("user role: ", this.user.role);
					if (this.user.role != 3) {
						// this.router.navigateByUrl(this.returnUrl); // Main page
						// this.store.dispatch(new Login({authToken: this.user.Username}));
						this.router.navigateByUrl('/reviewer'); // Main page
					} else {
						this.router.navigateByUrl('/dashboard'); // Main page
					}
				} else {
					this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');

				}
			},
			error => {
				// this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
				console.log('There was an error while retrieving Posts !!!' + error);
			}),
			takeUntil(this.unsubscribe),
			finalize(() => {
				this.loading = false;
				this.cdr.markForCheck();
			});

		// (user => {
		// 	if (user) {
		// 		// this.store.dispatch(new Login({authToken: user.Email}));
		// 		console.log(user);
		// 		// if user is not admin, redirect to reviewer page
		// 		this.loading = false;
		//
		// 		// if (user.RoleId != 3) {
		// 		// 	this.router.navigateByUrl("/reviewer"); // Main page
		// 		// } else
		// 		// 	this.router.navigateByUrl("/dashboard"); // Main page
		//
		//
		// 	} else {
		// 		this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
		// 	}

		// this.loading = false;
		// this.cdr.markForCheck();


		// 	takeUntil(this.unsubscribe),
		// 		finalize(() => {
		// 			this.loading = false;
		// 			this.cdr.markForCheck();
		// 		})
		// }));


		// 		if (user) {
		// 			this.store.dispatch(new Login({authToken: user.Email}));
		// 			this.router.navigateByUrl(this.returnUrl); // Main page
		// 		} else {
		// 			this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
		// 		}
		//
		// 		takeUntil(this.unsubscribe),
		// 			finalize(() => {
		// 				this.loading = false;
		// 				this.cdr.markForCheck();
		// 			})
		// }));
		// finalize(() => {
		// 	this.loading = false;
		// 	this.cdr.markForCheck();
		// })
	}

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.loginForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
}
