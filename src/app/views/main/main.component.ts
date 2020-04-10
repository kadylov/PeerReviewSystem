import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AboutComponent} from './about-page/about.component';
import {ContactComponent} from './contact-page/contact.component';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';


@Component({
	selector: 'kt-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit, OnDestroy {
	title: string = 'The Highest Scored Works';

	subscription:Subscription;

	ngOnInit() {
	}

	ngOnDestroy(){
		if (this.subscription !== undefined) {
			this.subscription.unsubscribe();
		}
	}

	constructor(private router: Router) {
		this.subscription= this.router.events
			.subscribe((event) => {
				if (event instanceof NavigationEnd) {

					switch (event.url) {
						case '/contact':
							this.title = 'About Peer Review System Application';
							break
						case '/about':
							this.title = 'About Peer Review System Application';
							break
						default:
							this.title = 'The Highest Scored Works';

					}
				}
			})

	}

}
