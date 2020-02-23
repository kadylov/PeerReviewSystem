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
import {Role} from '../../Model/Role';
import {Credential} from '../../Model/Credential';

@Component({
	selector: 'kt-user-edit',
	templateUrl: './user-edit.component.html',
	styleUrls: ['./user-edit.component.scss']
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
	roleIdForAdding: number;


	roles: Role[] = [];
	credentials: Credential[] = [];

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

		const roleCredential = JSON.parse(localStorage.getItem('roleCredential'));
		this.credentials = roleCredential['credentials'];
		this.roles = roleCredential['roles'];

		const routeSubscription = this.activatedRoute.params.subscribe(params => {
			const id = params['id'];
			if (id && id >= 0) {
				this.user = this.userService.getUser();
				if (this.user !== undefined) {
					this.credentialsIdForAdding = this.user.credentialID;
					this.roleIdForAdding = this.user.roleId;
					this.oldUser = Object.assign({}, this.user);
					this.initUser();
				} else {
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
		localStorage.removeItem('roleCredential');
	}

	/**
	 * Init user
	 */
	initUser() {
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
			role: [this.user.roleType, Validators.required],
			email: [this.user.email, [Validators.required, Validators.email]],
			credential: [this.user.credentialType, Validators.required]

		});
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
		_user.roleId = controls['role'].value;

		_user.credentialID = this.credentialsIdForAdding;
		// _user.roleId = this.roleIdForAdding;

		return _user;
	}

	/**
	 * Add User
	 *
	 * @param _user: User
	 * @param withBack: boolean
	 */
	addUser(_user: User1, withBack: boolean = false) {

		const subsc = this.userService.createUser(_user).subscribe(res => {

			const message = `New user has been created successfully.`;
			this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, false);
			this.router.navigateByUrl(this.mainUrl);

		}, error => {
			console.log(error);
		});

		this.subscriptions.push(subsc);

	}

	/**
	 * Update user
	 *
	 * @param _user: User
	 * @param withBack: boolean
	 */
	updateUser(_user: User1, withBack: boolean = false) {

		const subsc = this.userService.update(_user, this.user.username, this.user.email).subscribe(res => {
			const message = `User has been updated successfully.`;
			this.layoutUtilsService.showActionNotification(message, MessageType.Update, 4000, true, true);
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

