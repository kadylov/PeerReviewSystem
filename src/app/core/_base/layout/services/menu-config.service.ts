// Angular
import {Injectable} from '@angular/core';
// RxJS
import {Observable, Subject} from 'rxjs';

@Injectable()
export class MenuConfigService {
	// Public properties
	onConfigUpdated$: Subject<any>;

	onConfigUpdated1$: Subject<any>;
	// Private properties
	private menuConfig: any;
	private menuConfig1: any;

	/**
	 * Service Constructor
	 */
	constructor() {
		// register on config changed event and set default config
		this.onConfigUpdated$ = new Subject();
		this.onConfigUpdated1$ = new Subject();

	}

	/**
	 * Returns the menuConfig
	 */
	getMenus() {
		return this.menuConfig;
	}

	/**
	 * Load config
	 *
	 * @param config: any
	 */
	loadConfigs(config: any) {
		this.menuConfig = config;
		this.onConfigUpdated$.next(this.menuConfig);
	}

	/**
	 * Update config
	 *
	 * @param config: any
	 */
	updateConfigs1(config: any) {
		this.onConfigUpdated1$.next("admin");
	}

	getConfig():Observable<any> {
		return this.onConfigUpdated1$.asObservable();
	}
}
