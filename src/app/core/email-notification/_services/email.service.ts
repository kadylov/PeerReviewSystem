import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Email} from '../_models/email.model';
import {Observable, throwError} from 'rxjs';
import {Work} from '../../../views/author/model/work';
import {catchError} from 'rxjs/operators';


const url = 'http://3.95.8.94/example/mail_request.php';
const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});


@Injectable()
export class EmailService {


	constructor(private http: HttpClient) {
	}

	/*
	: string;
	?: string;
	?: string;
	: string;
	: string;
	*
	*
	* */

	sendEmail(email: Email): Observable<any> {
		const body = new HttpParams()
			.set(`contactMessage`, 'contactMessage',)
			.set(`senderName`, email.senderName)
			.set(`senderEmail`, email.senderEmail)
			.set(`subject`, email.subject)
			.set(`message`, email.message);
		return this.http.post<any>(url, body, {headers: headers})
			.pipe(
				catchError(err => {
					return throwError(err);
				})
			);
	}

}
