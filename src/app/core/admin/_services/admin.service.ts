import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of, throwError, zip} from 'rxjs';
import {Reviewer, ReviewInProgressModel} from '../_models/review-in-progress.model';
import {catchError, groupBy, map, mergeMap, toArray} from 'rxjs/operators';
import {User1} from '../../auth/_models/user1.model';

const ADMIN_REQUEST = 'http://3.95.8.94/example/admin_request.php';


const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

@Injectable()
export class AdminService {

	constructor(private http: HttpClient) {
	}

	public getAllAssignedWorks(): Observable<any> {
		return this.http.get<any>(ADMIN_REQUEST, {params: {getAssignedWorks: 'getAssignedWorks'}})
			.pipe(
				map(works => {
					return this.groupReviewers(works);
				})
			);

	}

	public getReviewersForAssignment(workID: number): Observable<Reviewer[]> {
		console.log("aaaa",workID);
		if (workID > 0) {
			return this.http.get<Reviewer[]>(ADMIN_REQUEST, {
				params: {
					reviewersToAssign: 'reviewersToAssign',
					workID: workID.toString()
				}
			})
				.pipe(
					map(reviewers => {
						return reviewers;
					}),
					catchError(err => throwError(err))
				);
		} else {
			return null;
		}


	}

	deactivateUser(_user: User1): Observable<any> {
		// console.log(_user);
		const body = new HttpParams()
			.set(`deactivateUser`, 'deactivateUser',)
			.set(`id`, _user.id.toString())
			.set(`activeStatus`, _user.isActive.toString())
			.set(`roleId`, _user.roleId.toString());

		return this.http.post<User1>(ADMIN_REQUEST, body, {headers: headers});
	}

	assignReviewer(assignment: any): Observable<any> {

		console.log(assignment);

		const body = new HttpParams()
			.set(`assignReviewer`, '1',)
			.set(`adminID`, assignment.adminID.toString())
			.set(`reviewerID`, assignment.reviewerID.toString())
			.set(`workID`, assignment.workID.toString())
			.set(`dueDate`, assignment.dueDate.toString())
			.set(`dateAssigned`, assignment.dateAssigned.toString());

		return this.http.post<any>(ADMIN_REQUEST, body, {headers: headers});
	}

	deactivateUserFromAssignment(reviewerID: number, workID: number) {
		const body = new HttpParams()
			.set(`deactivateFromAssignment`, '1',)
			.set(`ReviewerID`, reviewerID.toString())
			.set(`WorkID`, workID.toString());

		return this.http.post<any>(ADMIN_REQUEST, body, {headers: headers});
	}

	private groupReviewers(works: any) {
		let reviewerDueDate = [];
		let assignedWorks = [];
		let group = [];
		works.forEach(work => {

			(reviewerDueDate[work.WID] = reviewerDueDate[work.WID] || []).push({
				ReviewerID: work.ReviewerID,
				ReviewerName: work.ReviewerName,
				Role: work.Role,
				DueDate: work.DueDate
			});

			if (assignedWorks[work.WID] !== null) {
				assignedWorks[work.WID] = {
					WID: work.WID,
					Title: work.Title,
					URL: work.URL,
					AuthorName: work.AuthorName,
				};

			}
		});
		assignedWorks.forEach(work => {
			work.Reviewers = reviewerDueDate[work.WID];

			group.push(work);
		});

		// console.log(reviewers);
		// console.log("Ass ",assignedWorks);

		return group;
	}

	private convertToArray(str: string[]) {
		let ls: string = Object.assign(str);
		str = ls.split(',');
		return str;
	}
}
