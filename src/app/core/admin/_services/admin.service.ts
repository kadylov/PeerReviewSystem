import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {PreAssignment} from '../_models/Pre-assignment.model';


const API_REVIEWER_URL = 'http://3.95.8.94/example/admin_request.php';
const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

@Injectable()
export class AdminService {


	constructor(private http: HttpClient) {
	}

	getAllWorks(): Observable<any> {

		const body = new HttpParams()
			.set(`allWorks`, 'allWorks')

		return this.http.get<PreAssignment[]>(API_REVIEWER_URL, {
			params: {
				allWorks: 'allWorks'
			}
		});

	}

}
