import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {User1} from '../../auth/_models/user1.model';
import {catchError, map} from 'rxjs/operators';
import {ReviewHistory} from '../_models/review-history.model';
import {Assignment} from '../_models/assignment.model';
import {DataTableWorkModel} from '../../_base/layout';


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
}
