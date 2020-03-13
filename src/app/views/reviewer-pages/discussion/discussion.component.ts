import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import {MessagesRequested, NewMessageCreated} from '../../../core/reviewer/_actions/message.actions';
import * as fromReviewer from '../../../core/reviewer/_reducers';
import {Observable} from 'rxjs';
import {Message} from '../../../core/reviewer/_models/message.model';
import {DatePipe} from '@angular/common';
import {User1} from '../../../core/auth/_models/user1.model';


@Component({
		selector: 'kt-discussion',
		templateUrl: './discussion.component.html',
		styleUrls: ['./discussion.component.scss']

	}
)
export class DiscussionComponent implements OnInit {

	@Input() title: string = 'Discussion';
	@Output() close = new EventEmitter<void>();


	messages$: Observable<Message[]>;
	newMessage: string;

	reviewer: User1;

	constructor(
		private store: Store<fromReviewer.ReviewerState>,
		private datepipe: DatePipe,
	) {


	}


	ngOnInit(): void {
		this.store.dispatch(new MessagesRequested(4));
		this.loadDiscussionHistory();

		this.reviewer = JSON.parse(localStorage.getItem('user'));
	}

	loadDiscussionHistory() {
		this.messages$ = this.store.select(fromReviewer.getMessages);

	}

	submit(input: any) {
		let msg = input.value;
		input.value = '';

		let newMessage: Message = {
			ReviewerID: this.reviewer.id,
			ReviewerName: this.reviewer.fullname,
			Message: msg,
			DTime: this.datepipe.transform(new Date(Date.now()), 'yyyy-MM-dd HH:mm:ss'),
			WorkID: 4
		};

		this.store.dispatch(new NewMessageCreated(newMessage));
	}
}
