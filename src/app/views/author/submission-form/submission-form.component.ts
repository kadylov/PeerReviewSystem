// Angular
import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthNoticeService} from '../../../core/auth';
import {Observable, of, Subject, Subscription} from 'rxjs';
import {TagModel} from '../../../core/author/_models/tag.model';
import {TagService} from '../../../core/author/_services/tag.service';
import {map, tap} from 'rxjs/operators';

export class SelectedTag {
	title: string;

}

@Component({
	selector: 'kt-submission',
	templateUrl: './submission-form.component1.html',
	styleUrls: ['./submission-form.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class SubmissionFormComponent implements OnInit, AfterViewInit, OnDestroy {

	@ViewChild('title', {static: true}) titleField: ElementRef;

	registerForm: FormGroup;
	loading = false;
	errors: any = [];
	minDate: Date = new Date(100, 0, 1);
	maxDate: Date = new Date(Date.now());


	private unsubscribe: Subject<any>; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
	private tagSub: Subscription;

	visible = true;
	selectable = true;
	removable = true;

	tags$: Observable<TagModel[]>;
	selectedOptions = [];
	chips: string[] = [];

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
		private fb: FormBuilder,
		private tagService: TagService,
	) {
	}


	/**
	 * On init
	 */
	ngOnInit() {

		this.tags$ = this.tagService.getAllTags();
		this.initRegisterForm();

		// this.titleField.nativeElement.focus();

	}

	/**
	 * On AfterView
	 */
	ngAfterViewInit() {
		setTimeout(() => {
			// this.titleField.nativeElement.focus();
		}, 3000);


		/*
		*
		*  setTimeout(()=>{
    this.loading = true;
    if (this.loading == true) {
      this.viewPayloadTransaction();
    }
     },3000);
		*
		* */

	}

	/*
	 * On destroy
	 */
	ngOnDestroy(): void {
		// this.unsubscribe.next();
		// this.unsubscribe.complete();
		this.loading = false;
		// this.tags$
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
				Validators.email,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			],
			tag1: ['', Validators.compose([
				Validators.required,
			])
			],
			tag2: ['', Validators.compose([
				Validators.required,
			])
			],
			tag3: ['', Validators.compose([
				Validators.required,
			])
			],
			tag4: ['', Validators.compose([
				Validators.required,
			])
			],
			tag5: ['', Validators.compose([
				Validators.required,
			])
			],
			tag6: ['', Validators.compose([
				Validators.required,
			])
			],
			tag7: ['', Validators.compose([
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
		// this.loading = true;
		// const _user: User = new User();
		// _user.clear();
		// _user.email = controls['email'].value;
		// _user.username = controls['username'].value;
		// _user.fullname = controls['fullname'].value;
		// _user.password = controls['password'].value;
		// _user.roles = [];
		// this.auth.register(_user).pipe(
		//     tap(user => {
		//        if (user) {
		//           this.store.dispatch(new Register({authToken: user.accessToken}));
		//           // pass notice message to the login page
		//           this.authNoticeService.setNotice(this.translate.instant('AUTH.REGISTER.SUCCESS'), 'success');
		//           this.router.navigateByUrl('/auth/login');
		//        } else {
		//           this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
		//        }
		//     }),
		//     takeUntil(this.unsubscribe),
		//     finalize(() => {
		//        this.loading = false;
		//        this.cdr.markForCheck();
		//     })
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

	remove(title: any, tag?: any): void {

		for (const index in this.selectedOptions) {
			if (this.selectedOptions[index] !== undefined) {
				this.selectedOptions[index] = this.selectedOptions[index].filter(f => f !== title);

			}
		}

		// console.log('Del', this.selectedOptions);
		this.chips = this.chips.filter(c => c !== title);
	}


	selectionChanged(event: any, tagTitle: string) {

		if (event.isUserInput) {
			const selectedTag: string = event.source.value;

			if (event.source.selected) {


				this.chips.push(selectedTag);

				let opts: string[] = this.selectedOptions[tagTitle];
				console.log('opts', opts);

				if (opts !== undefined) {
					opts.push(selectedTag);

				} else {
					opts = [selectedTag];
				}
				this.selectedOptions[tagTitle] = opts;
				console.log('selectedOptions[', tagTitle, '] ', this.selectedOptions);

			} else {
				this.chips = this.chips.filter(c => c !== selectedTag);
			}
		}

	}

}
