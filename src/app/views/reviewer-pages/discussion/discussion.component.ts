import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
		selector: 'kt-discussion',
		templateUrl: './discussion.component.html',
		styleUrls: ['./discussion.component.scss']

	}
)
export class DiscussionComponent {

	@Input()title: string='Discussion';
	@Output()close=new EventEmitter<void>();

	constructor(private modalService: NgbModal,
				iconRegistry: MatIconRegistry,
				sanitizer: DomSanitizer) {

		iconRegistry.addSvgIcon('chat1',
			sanitizer.bypassSecurityTrustResourceUrl('./assets/media/icons/svg/Communication/Chat_1.svg'));
	}

	open(content) {
		this.modalService.open(content);
	}

}
