// Angular
import {Component, OnInit, OnDestroy, Input, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// RxJS
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
// NGRX
import {Update} from '@ngrx/entity';
// Layout
import {SubheaderService, LayoutConfigService} from '../../../../../core/_base/layout';
import {LayoutUtilsService, MessageType} from '../../../../../core/_base/crud';
import {UserManagementService} from '../../service/user-management.service';

// Services and Models
import {
	User,
} from '../../../../../core/auth';
import {User1} from '../../../../../core/auth/_models/user1.model';

@Component({
	selector: 'kt-user-edit',
	templateUrl: './user-edit.component.html',
})
export class UserEditComponent implements OnInit, OnDestroy {
	// Public properties
	user: User1;
	userId$: Observable<number>;
	oldUser: User1;
	selectedTab: number = 0;
	loading$: Observable<boolean>;
	rolesSubject = new BehaviorSubject<number>(0);
	userForm: FormGroup;
	hasFormErrors: boolean = false;

	// credentialsIdForAdding = "Academic";
	credentialsIdForAdding: number;

	// Private properties
	private subscriptions: Subscription[] = [];

	private mainUrl = '/admin/user-management/users';

	// @Input() userToEdit;


	/**
	 * Component constructor
	 *
	 * @param activatedRoute: ActivatedRoute
	 * @param router: Router
	 * @param userFB: FormBuilder
	 * @param subheaderService: SubheaderService
	 * @param layoutUtilsService: LayoutUtilsService
	 * @param layoutConfigService: LayoutConfigService
	 * @param userService
	 */
	constructor(private activatedRoute: ActivatedRoute,
				private router: Router,
				private userFB: FormBuilder,
				private subheaderService: SubheaderService,
				private layoutUtilsService: LayoutUtilsService,
				private layoutConfigService: LayoutConfigService,
				private userService: UserManagementService) {
	}


	/**
	 * On init
	 */
	ngOnInit() {
		const routeSubscription = this.activatedRoute.params.subscribe(params => {
			const id = params['id'];
			console.log('user-edit ngOnInit id', id);
			if (id && id >= 0) {
				this.user = this.userService.getUser();
				if (this.user !== undefined) {
					this.credentialsIdForAdding = this.user.credentialID;
					this.rolesSubject.next(this.user.role);
					this.oldUser = Object.assign({}, this.user);
					this.initUser();
				}
				else{
					this.router.navigateByUrl('admin/user-management/users');
				}


			} else {
				this.user = new User1();
				this.user.clear();
				// this.rolesSubject.next(this.user.role);
				this.oldUser = Object.assign({}, this.user);
				this.initUser();
			}
		});
		this.subscriptions.push(routeSubscription);

	}

	ngOnDestroy() {
		this.subscriptions.forEach(sb => sb.unsubscribe());
	}

	/**
	 * Init user
	 */
	initUser() {
		console.log('initUser with id', this.user.id);

		this.createForm();
		if (!this.user.id) {
			this.subheaderService.setTitle('Create user');
			this.subheaderService.setBreadcrumbs([
				{title: 'User Management', page: `user-management`},
				{title: 'Users', page: `user-management/users`},
				{title: 'Create user', page: `user-management/users/add`}
			]);
			return;
		}
		this.subheaderService.setTitle('Edit user');
		this.subheaderService.setBreadcrumbs([
			{title: 'User Management', page: `user-management`},
			{title: 'Users', page: `user-management/users`},
			{title: 'Edit user', page: `user-management/users/edit`, queryParams: {id: this.user.id}}
		]);
	}

	/**
	 * Create form
	 */
	createForm() {
		this.userForm = this.userFB.group({
			username: [this.user.username, Validators.required],
			fullname: [this.user.fullname, Validators.required],
			password: [this.user.password, Validators.required],
			role: [this.user.role, Validators.required],
			email: [this.user.email, Validators.email],
			credential: [this.user.credentialID, Validators.required]

		});
	}

	/**
	 * Redirect to list
	 *
	 */
	goBackWithId() {
		const url = `/user-management/users`;
		this.router.navigateByUrl('/user-management/users');
	}

	/**
	 * Refresh user
	 *
	 * @param isNew: boolean
	 * @param id: number
	 */
	refreshUser(isNew: boolean = false, id = 0) {
		let url = this.router.url;
		url = `/admin/user-management/users/`;

		if (!isNew) {
			this.router.navigate([url], {relativeTo: this.activatedRoute});
			// this.router.navigateByUrl('admin/user-management/users/');
			return;
		}

		// url = `/user-management/users/edit/${id}`;
		url = `/admin/user-management/users/`;
		this.router.navigateByUrl(url, {relativeTo: this.activatedRoute});
		return;
	}

	/**
	 * Reset
	 */
	reset() {
		this.user = Object.assign({}, this.oldUser);
		this.createForm();
		this.hasFormErrors = false;
		this.userForm.markAsPristine();
		this.userForm.markAsUntouched();
		this.userForm.updateValueAndValidity();
	}

	/**
	 * Save data
	 *
	 * @param withBack: boolean
	 */
	onSumbit(withBack: boolean = false) {
		this.hasFormErrors = false;
		const controls = this.userForm.controls;
		/** check form */
		if (this.userForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			this.selectedTab = 0;
			return;
		}

		const editedUser = this.prepareUser();

		console.log('onSubmit user', editedUser);

		if (editedUser.id >= 0) {
			this.updateUser(editedUser, withBack);
			return;
		}

		this.addUser(editedUser, withBack);
	}

	/**
	 * Returns prepared data for save
	 */
	prepareUser(): User1 {
		const controls = this.userForm.controls;
		const _user = new User1();
		_user.clear();
		_user.accessToken = this.user.accessToken;
		_user.refreshToken = this.user.refreshToken;
		_user.id = this.user.id;
		_user.username = controls['username'].value;
		_user.email = controls['email'].value;
		_user.fullname = controls['fullname'].value;
		_user.password = controls['password'].value;
		_user.role = controls['role'].value;

		_user.credentialID = this.credentialsIdForAdding;
		// _user.role = this.user.role;
		return _user;
	}

	/**
	 * Add User
	 *
	 * @param _user: User
	 * @param withBack: boolean
	 */
	addUser(_user: User1, withBack: boolean = false) {

		this.userService.createUser(_user).subscribe(res => {
			console.log('Response from createUser ', res);
		}, error => {
			console.log(error);
		});

		const message = `New user has been created successfully.`;
		this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, true);

		this.router.navigateByUrl(this.mainUrl);
	}

	/**
	 * Update user
	 *
	 * @param _user: User
	 * @param withBack: boolean
	 */
	updateUser(_user: User1, withBack: boolean = false) {
		const subsc = this.userService.update(_user).subscribe(res => {
			console.log('User-Edit updateUser', res);

			const message = `User has been updated successfully.`;
			this.layoutUtilsService.showActionNotification(message, MessageType.Update, 3000, true, true);
			this.router.navigateByUrl('admin/user-management/users');
		}, error => {
			console.log(error);
		});

		this.subscriptions.push(subsc);

	}

	/**
	 * Returns component title
	 */
	getComponentTitle() {
		let result = 'Create user';
		if (!this.user || !this.user.id) {
			return result;
		}

		result = `Edit user - ${this.user.fullname}`;
		return result;
	}

	/**
	 * Close Alert
	 *
	 * @param $event: Event
	 */
	onAlertClose($event) {
		this.hasFormErrors = false;
	}
}

