// Angular
import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthNoticeService} from '../../../core/auth';
import {Observable, Subject, Subscription} from 'rxjs';
import {TagModel} from '../../../core/author/_models/tag.model';
import {TagService} from '../../../core/author/_services/tag.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {Work} from '../model/work';
import {DatePipe} from '@angular/common';
import {WorkService} from '../service/work.service';

export class SelectedTag {
	title: string;

}

@Component({
	selector: 'kt-submission',
	templateUrl: './submission-form.component.html',
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
	singleSelected = [];

	private sub: Subscription;

	/**
	 * Component constructor
	 *
	 * @param authNoticeService: AuthNoticeService
	 * @param router: Router
	 * @param fb: FormBuilder
	 * @param tagService
	 * @param snackBar
	 */
	constructor(
		private authNoticeService: AuthNoticeService,
		private router: Router,
		private fb: FormBuilder,
		private tagService: TagService,
		private snackBar: MatSnackBar,
		private datepipe: DatePipe,
		private workService: WorkService
	) {
	}


	/**
	 * On init
	 */
	ngOnInit() {

		// this.tags$ = this.tagService.getAllTags();
		this.tags$ = this.workService.getAllTags();

		this.initRegisterForm();

		// this.titleField.nativeElement.focus();

	}

	ngAfterViewInit() {
		// setTimeout(() => {
		// 	// this.titleField.nativeElement.focus();
		// }, 3000);
	}

	/*
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.loading = false;
		if (this.sub != undefined) {
			this.sub.unsubscribe();

		}
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
				Validators.maxLength(200)
			])
			],
			date_written: ['', Validators.compose([
				Validators.required,
			]),
			],
			url: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(400)
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

		this.loading = true;
		const controls = this.registerForm.controls;

		// check form
		if (this.registerForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.loading = false;

			return;
		}

		let work: Work = new Work();
		work.Title = controls['title'].value;
		work.DateWritten = this.datepipe.transform(controls['date_written'].value, 'yyyyMMddHHmmss');
		work.DateSubmission = this.datepipe.transform(new Date(Date.now()), 'yyyyMMddHHmmss');
		work.URL = controls['url'].value;
		work.AuthorName = controls['author'].value;
		work.AuthorEmail = controls['email'].value;

		let tags: string[] = [];
		for (let i = 1; i <= 7; i++) {
			let tag = controls['tag' + i].value;
			if (tag !== undefined) {
				tags = tags.concat(tag);
			}
		}


		work.SelectedTags = work.SelectedTags.concat(tags);
		const message = 'Your Work has been submitted successfully!';


		this.sub = this.workService.submit(work).subscribe(
			res => {
				this.loading = false;
				this.resetForm();
				this.displaySnackBar(message);
				this.router.navigateByUrl('/home');

			},

			err => {
				this.displaySnackBar('Work is not received.');
				return;
			}
		);
		// this.displaySnackBar(message);

	}

	resetForm() {
		this.registerForm.reset();
		const controls = this.registerForm.controls;
		for (const key in controls) {
			this.registerForm.get(key).clearValidators();
			this.registerForm.get(key).updateValueAndValidity();
		}

	}

	displaySnackBar(message: string) {
		let config = new MatSnackBarConfig();
		config.duration = 5000;
		config.panelClass = ['d-flex', 'justify-content-center', 'snackbar1'];
		this.snackBar.open(message, '', config);
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

		this.chips = this.chips.filter(c => c !== title);

		for (const index in this.selectedOptions) {
			if (this.selectedOptions[index] !== undefined) {
				this.selectedOptions[index] = this.selectedOptions[index].filter(f => f !== title);

			}
		}

	}

	removeFromSingleSelected(chip: any) {
		console.log(this.singleSelected);

		for (let i = 0; i < this.singleSelected.length; ++i) {
			if (this.singleSelected[i] === chip) {
				// console.log(chip);
				this.singleSelected[i] = '';
				break;
			}
		}
		console.log(this.singleSelected);

	}

	selectionChanged(event: any, tagTitle: string) {

		if (event.isUserInput) {
			const selectedTag: string = event.source.value;

			if (event.source.selected) {


				this.chips.push(selectedTag);

				let opts: string[] = this.selectedOptions[tagTitle];
				// console.log('opts', opts);

				if (opts !== undefined) {
					opts.push(selectedTag);

				} else {
					opts = [selectedTag];
				}
				this.selectedOptions[tagTitle] = opts;
				// console.log('selectedOptions[', tagTitle, '] ', this.selectedOptions);

			} else {
				this.chips = this.chips.filter(c => c !== selectedTag);
			}
		}

	}

	singleSelectionChanged(event: any, title: string) {
		if (event.isUserInput) {
			const selectedTag: string = event.source.value;
			console.log(this.singleSelected);

			// if (event.source.selected) {

			if (this.chips.indexOf(selectedTag) == -1) {
				this.chips.push(selectedTag);
			}


			// } else {
			// 	this.chips = this.chips.filter(c => c !== selectedTag);
			// }
		}
	}
}


