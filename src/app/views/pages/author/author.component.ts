// Angular
import { Component, ElementRef, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
// Layout
import { LayoutConfigService } from '../../../core/_base/layout';
// Auth
import { AuthNoticeService } from '../../../core/auth';

@Component({
	selector: 'kt-auth',
	templateUrl: './author.component.html',
	styleUrls: ['./author.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AuthorComponent implements OnInit {
	// Public properties
	today: number = Date.now();
	headerLogo: string;

	/**
	 * Component constructor
	 *
	 * @param el
	 * @param render
	 * @param layoutConfigService: LayoutConfigService
	 * @param authNoticeService: authNoticeService
	 */
	constructor(
		private el: ElementRef,
		private render: Renderer2,
		private layoutConfigService: LayoutConfigService,
		public authNoticeService: AuthNoticeService,
		) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		// this.translationService.setLanguage(this.translationService.getSelectedLanguage());
		this.headerLogo = this.layoutConfigService.getLogo();

	}

	/**
	 * Load CSS for this specific page only, and destroy when navigate away
	 * @param styleUrl
	 */
	private loadCSS(styleUrl: string) {
		return new Promise((resolve, reject) => {
			const styleElement = document.createElement('link');
			styleElement.href = styleUrl;
			styleElement.type = 'text/css';
			styleElement.rel = 'stylesheet';
			styleElement.onload = resolve;
			this.render.appendChild(this.el.nativeElement, styleElement);
		});
	}
}
