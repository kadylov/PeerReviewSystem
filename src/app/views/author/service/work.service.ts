import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Work} from '../model/work';
import {Observable} from 'rxjs';


const api = 'http://3.95.8.94/example/work_request.php';
const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});


@Injectable({
	providedIn: 'root'
})
export class WorkService {


	constructor(private http: HttpClient) {
	}


	submit(work: Work): Observable<any> {

		const body = new HttpParams()
			.set(`postNewWork`, 'postNewWork',)
			.set(`title`, work.title)
			.set(`dateWritten`, work.dateWritten)
			.set(`dateSubmitted`, work.dateSubmitted)
			.set(`url`, work.url)
			.set(`author`, work.author)
			.set(`email`, work.email)
			.set(`selectedTags`, work.selectedTags.toString())
		return this.http.post<Work>(api, body, {headers: headers});
	}
}
