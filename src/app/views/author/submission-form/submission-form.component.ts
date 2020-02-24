// Angular
import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthNoticeService} from '../../../core/auth';
import {Observable, of, Subject, Subscription} from 'rxjs';
import {TagModel} from '../../../core/author/_models/tag.model';
import {TagService} from '../../../core/author/_services/tag.service';
import {MatSnackBar} from '@angular/material';
import {Work} from '../model/work';
import {DatePipe} from '@angular/common';
import {WorkService} from '../service/work.service';

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
	singleSelected = [];
	aaa: number = 0;


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
				// Validators.required,
			])
			],
			tag3: ['', Validators.compose([
				// Validators.required,
			])
			],
			tag4: ['', Validators.compose([
				// Validators.required,
			])
			],
			tag5: ['', Validators.compose([
				// Validators.required,
			])
			],
			tag6: ['', Validators.compose([
				// Validators.required,
			])
			],
			tag7: ['', Validators.compose([
				// Validators.required,
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
		// console.log('AAAa1 ', controls);

		// check form
		if (this.registerForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.loading = false;

			return;
		}

		let work: Work = new Work();
		work.title = controls['title'].value;
		work.dateWritten = this.datepipe.transform(controls['date_written'].value, 'yyyyMMddHHmmss');
		work.dateSubmitted = this.datepipe.transform(new Date(Date.now()), 'yyyyMMddHHmmss');
		work.url = controls['url'].value;
		work.author = controls['author'].value;
		work.email = controls['email'].value;

		let tags: string[] = [];
		for (let i = 1; i <= 7; i++) {
			let tag = controls['tag' + i].value;
			if (tag !== undefined) {
				tags = tags.concat(tag);
			}
		}

		// console.log(tags);

		work.selectedTags = work.selectedTags.concat(tags);
		console.log(work);

		const message = 'Your Work has been submitted successfully!';

		this.workService.submit(work).subscribe(
			res=>{
				this.loading = false;
				this.snackBar.open(message, '', {duration: 4000});
				this.router.navigateByUrl('/home');

			}
		);
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


		// // loop through the single selected array
		// for (const index in this.singleSelected) {
		// 	if (this.singleSelected[index] !== undefined) {
		// 		this.singleSelected[index] = undefined;
		//
		// 	}
		// }

		// if (this.singleSelected['main'] !== undefined) {
		// 	console.log('SSSS ', this.singleSelected['main']);
		// 	this.singleSelected['main'] = undefined;
		// }
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
