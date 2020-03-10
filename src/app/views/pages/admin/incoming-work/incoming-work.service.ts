import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IncomingWorkModel} from '../../../../core/_base/layout/models/incoming-work.model';


const api = 'http://3.95.8.94/example/admin_request.php';
const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});


@Injectable({
	providedIn: 'root'
})
export class IncomingWorkService {


	constructor(private http: HttpClient) {
	}


	submit(adminReview: IncomingWorkModel): Observable<any> {

		const body = new HttpParams()
			.set(`adminReview`, 'adminReview',)
			.set(`AdminID`, adminReview.AdminID.toString())
			.set(`WorkID`, adminReview.WorkID.toString())
			.set(`DateReviewed`, adminReview.DateReviewed)
			.set(`Decision`, adminReview.Decision)
			.set(`RejectNote`, adminReview.RejectNote)
		return this.http.post<any>(api, body.toString(), {headers: headers, observe: 'response'});
	}
}
