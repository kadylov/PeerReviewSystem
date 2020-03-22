import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of, zip} from 'rxjs';
import {Reviewer, ReviewInProgressModel} from '../_models/review-in-progress.model';
import {groupBy, map, mergeMap, toArray} from 'rxjs/operators';

const ADMIN_REQUEST = 'http://3.95.8.94/example/admin_request.php';


const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

@Injectable()
export class AdminService {

	constructor(private http: HttpClient) {
	}

	/*
	*  {
			"WID": "4",
			"Title": "Can you measure the ROI of your social media marketing?",
			"URL": "https://www.researchgate.net/publication/228237594_Can_You_Measure_the_ROI_of_Your_Social_Media_Marketing",
			"AuthorName": " Donna Hoffman",
			"Status": "assigned",
			"ReviewerID": "1",
			"ReviewerName": "Melissa Klein",
			"DateAssigned": "2019-11-12",
			"DueDate": "2019-11-14"
		},
	* */
	public getAllAssignedWorks(): Observable<any> {
		return this.http.get<any>(ADMIN_REQUEST, {params: {getAssignedWorks: 'getAssignedWorks'}})
			.pipe(
				map(works => {
					return this.groupReviewers(works);
				})
			);

	}

	private groupReviewers(works: any) {
		let reviewerDueDate = [];
		let assignedWorks = [];
		let group=[];
		works.forEach(work => {

			(reviewerDueDate[work.WID] = reviewerDueDate[work.WID] || []).push({
				ReviewerID: work.ReviewerID,
				ReviewerName: work.ReviewerName,
				Role:work.Role,
				DueDate:work.DueDate
			});

			if (assignedWorks[work.WID] !== null) {
				assignedWorks[work.WID]= {
					WID: work.WID,
					Title: work.Title,
					URL: work.URL,
					AuthorName: work.AuthorName,
				}

			}
		});
		assignedWorks.forEach(work=>{
			work.Reviewers = reviewerDueDate[work.WID]

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
