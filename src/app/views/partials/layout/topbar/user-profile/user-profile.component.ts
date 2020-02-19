// Angular
import { Component, Input, OnInit } from '@angular/core';
// RxJS
import { Observable } from 'rxjs';
// NGRX
import { select, Store } from '@ngrx/store';
// State
import { AppState } from '../../../../../core/reducers';
import { currentUser, Logout, User } from '../../../../../core/auth';
import {User1} from '../../../../../core/auth/_models/user1.model';
import {NavigationEnd, Router} from '@angular/router';

@Component({
	selector: 'kt-user-profile',
	templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
	// Public properties
	user$: Observable<User>;
	_user: User1;
	pic: './assets/media/users/300_25.jpg';
	private returnUrl: string;



	@Input() avatar: boolean = true;
	@Input() greeting: boolean = true;
	@Input() badge: boolean;
	@Input() icon: boolean;


	/**
	 * Component constructor
	 *
	 * @param store: Store<AppState>
	 */
	constructor(private store: Store<AppState>,
				private router: Router) {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.returnUrl = event.url;
			}
		});
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		// this.user$ = this.store.pipe(select(currentUser));
		this._user = JSON.parse(localStorage.getItem('user'));
	}

	/**
	 * Log out
	 */
	logout() {
		// this.store.dispatch(new Logout());
		localStorage.clear();
		this.router.navigateByUrl('/auth/login');
		// this.router.navigate(['/auth/login'], {queryParams: {returnUrl: this.returnUrl}});

	}
}
