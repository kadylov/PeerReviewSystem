import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {User1} from '../../auth/_models/user1.model';
import {catchError, map} from 'rxjs/operators';
import {ReviewHistory} from '../_models/review-history.model';


const API_REVIEWER_URL = 'http://3.95.8.94/example/reviewer_request.php';
const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

@Injectable()
export class ReviewerService {


	constructor(private http:HttpClient) {
	}

	// login(username: string, password: string): Observable<User1> {
	//
	// 	const body = new HttpParams()
	// 		.set(`userLogin`, 'userLogin',).set(`username`, username).set(`password`, password);
	// 	const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
	// 	// return this.http.post<User1>(API_USER_URL, body.toString(), {headers});
	//
	// 	return this.http.post<User1>(API_USER_URL, body.toString(), {headers, observe: 'response'})
	// 		.pipe(
	// 			map(response => {
	// 				return response.body[0];
	// 			}),
	// 			catchError(error => {
	// 				return throwError(error);
	// 			}));
	// }

	getAllReviews():Observable<any> {

		let user = JSON.parse(localStorage.getItem('user'));

		const body = new HttpParams()
			.set(`reviewHistory`, 'reviewHistory')
			.set(`ReviewerID`, user.id);

		return this.http.get<ReviewHistory[]>(API_REVIEWER_URL, {params: {
				reviewHistory: 'reviewHistory',
				ReviewerID:user.id
			}
			})

	}

}
