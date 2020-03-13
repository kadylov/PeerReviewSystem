import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {User1} from '../../auth/_models/user1.model';
import {catchError, map} from 'rxjs/operators';
import {ReviewHistory} from '../_models/review-history.model';
import {Assignment} from '../_models/assignment.model';
import {DataTableWorkModel} from '../../_base/layout';
import {Message} from '../_models/message.model';
import {Work} from '../../../views/author/model/work';


const API_REVIEWER_URL = 'http://3.95.8.94/example/reviewer_request.php';
const API_REVIEWER_URL2 = 'http://3.95.8.94/example/admin_request.php';
const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

@Injectable()
export class ReviewerService {


	constructor(private http: HttpClient) {
	}

	getAllReviews(): Observable<any> {
		let user = JSON.parse(localStorage.getItem('user'));

		const body = new HttpParams()
			.set(`reviewHistory`, 'reviewHistory')
			.set(`ReviewerID`, user.id);

		return this.http.get<ReviewHistory[]>(API_REVIEWER_URL, {
			params: {
				reviewHistory: 'reviewHistory',
				ReviewerID: user.id
			}
		});

	}

	getCurrentAssignment(reviewerID: number): Observable<any> {
		return this.http.get<Assignment[]>(API_REVIEWER_URL, {
			params: {
				listAssignments: 'assignedWorks',
				ReviewerID: reviewerID.toString()
			}
		});
	}

	getAssignmentHistory(reviewerID: number): Observable<any> {
		return this.http.get<Assignment[]>(API_REVIEWER_URL, {
			params: {
				assignmentHistory: 'assignmentHistory',
				ReviewerID: reviewerID.toString()
			}
		});
	}

	getMessageHistory(workID: number): Observable<Message[]> {
		return this.http.get<Message[]>(API_REVIEWER_URL, {
			params: {
				getDiscussions: 'getDiscussions',
				WorkID: workID.toString()
			}
		});
	}

	postNewMessage(message: Message): Observable<any> {
		//WorkID, ReviewerID, Message, DTime
		const body = new HttpParams()
			.set(`postNewMessage`, 'postNewMessage')
			.set(`WorkID`, message.WorkID.toString())
			.set(`ReviewerID`, message.ReviewerID.toString())
			.set(`Message`, message.Message)
			.set(`DTime`, message.DTime);
		// return this.http.post<Work>(api, body, {headers: headers});


		return this.http.post<any>(API_REVIEWER_URL, body, {headers: headers});
	}


}
