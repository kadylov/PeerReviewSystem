import {Component, ComponentFactoryResolver, ComponentRef, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {
	LayoutConfigService,
} from '../../../core/_base/layout';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
	selector: 'kt-reviewer-dashboard',
	templateUrl: './r_dashboard.component.html',
	styleUrls: ['./r_dashboard.component.scss']
})
export class R_DashboardComponent implements OnInit {

	modal = false;


	constructor(private layoutConfigService: LayoutConfigService,
				private modalService: NgbModal,
				private resolver: ComponentFactoryResolver,
				iconRegistry: MatIconRegistry,
				sanitizer: DomSanitizer,


				// delete later
	) {

		iconRegistry.addSvgIcon('chat1',
			sanitizer.bypassSecurityTrustResourceUrl('./assets/media/icons/svg/Communication/Chat_1.svg'));
	}

	ngOnInit(): void {
	}


	public testvar = [];

	test() {
	}

}
