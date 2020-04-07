import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

// models
import {User1} from '../../../../core/auth/_models/user1.model';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {catchError, map, retry} from 'rxjs/operators';

const API_USER_LIST_URL = 'http://3.95.8.94/example/admin_request.php';
// const API_USER_LIST_URL = 'http://localhost/admin_request.php';


const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});


@Injectable()
export class UserManagementService {


	private usertoEdit: User1 = undefined;

	constructor(private http: HttpClient) {
	}


	public getUser() {
		let user = this.usertoEdit;
		this.usertoEdit = undefined;
		return user;
	}


	public setUser(user: User1) {
		this.usertoEdit = user;
	}

	public getAllUsers(): Observable<User1[]> {
		return this.http.get<User1[]>(API_USER_LIST_URL, {params: {getUsers: 'getUsers'}})
			.pipe(retry(3)
			);
	}

	getUserById(userId: number): Observable<User1> {
		return this.http.get<User1>(API_USER_LIST_URL, {params: {getUserById: userId.toString()}})
			.pipe(retry(3));
	}

	update(_user: User1, oldUsername?: string, oldEmail?:string): Observable<any> {
		// console.log('Update user');
		// console.log(_user);
		// console.log('oldUsername',oldUsername);
		// console.log('oldEmail',oldEmail);

		const body = new HttpParams()
			.set(`updateUser`, 'updateUser',)
			.set(`Username`, _user.username)
			.set(`Password`, _user.password)
			.set(`Name`, _user.fullname)
			.set(`Email`, _user.email)
			.set(`oldUsername`, oldUsername)
			.set(`oldEmail`, oldEmail)
			.set(`CredentialID`, _user.credentialID.toString())
			.set(`RoleId`, _user.roleId.toString())
			.set(`ID`, _user.id.toString());

		// const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
		// const headers = new HttpHeaders({'Content-Type': 'application/json'});

		return this.http.post<User1>(API_USER_LIST_URL, body, {headers: headers});
	}

	// UPDATE => PUT: update the user on the server
	// updateUser(_user: User): Observable<any> {
	// 	const httpHeaders = new HttpHeaders();
	// 	httpHeaders.set('Content-Type', 'application/json');
	// 	return this.http.put(API_USERS_URL, _user, { headers: httpHeaders });
	// }
	createUser(_user: User1): Observable<any> {
		// console.log('Create user');
		// console.log(_user);

		const body = new HttpParams()
			.set(`createUser`, 'createUser',)
			.set(`Username`, _user.username)
			.set(`Password`, _user.password)
			.set(`Name`, _user.fullname)
			.set(`Email`, _user.email)
			.set(`CredentialID`, _user.credentialID.toString())
			.set(`RoleId`, _user.roleId.toString())
		;

		const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
		return this.http.post<User1>(API_USER_LIST_URL, body, {headers: headers});
	}

	deleteUser(_user: User1): Observable<any> {
		console.log('Delete user');
		console.log(_user);

		const body = new HttpParams()
			.set(`deleteReviewer`, 'deleteReviewer',)
			.set(`RID`, _user.id.toString());

		// const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
		return this.http.post<User1>(API_USER_LIST_URL, body, {headers: headers});
	}

	deactivateUser(_user: User1): Observable<any> {
		// console.log(_user);
		const body = new HttpParams()
			.set(`deactivateUser`, 'deactivateUser',)
			.set(`id`, _user.id.toString())
			.set(`activeStatus`, _user.isActive.toString())
			.set(`roleId`, _user.roleId.toString());

		return this.http.post<User1>(API_USER_LIST_URL, body, {headers: headers});
	}
}
