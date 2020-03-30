import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Work} from '../model/work';
import {Observable, throwError} from 'rxjs';
import {TagModel} from '../../../core/author/_models/tag.model';
import {catchError, map, tap} from 'rxjs/operators';


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
			.set(`title`, work.Title)
			.set(`dateWritten`, work.DateWritten)
			.set(`dateSubmitted`, work.DateSubmission)
			.set(`url`, work.URL)
			.set(`author`, work.AuthorName)
			.set(`email`, work.AuthorEmail)
			.set(`selectedTags`, work.SelectedTags.toString());
		return this.http.post<Work>(api, body, {headers: headers})
			.pipe(
				catchError(err => {
					return throwError(err);
				})
			);
	}

	getAllTags(): Observable<TagModel[]> {
		return this.http.get<TagModel[]>(api, {params: {getAllTags: 'getAllTags'}})
			.pipe(
				map(tags => {
					tags.forEach(tag => {
						// let ls: string = Object.assign(tag.TagList);
						// tag.TagList = ls.split(',');
						tag.TagList = this.convertToArray(tag.TagList);

					});


					return tags;
				})
			);
	}


	private convertToArray(str: string[]) {
		let ls: string = Object.assign(str);
		str = ls.split(',');
		return str;
	}
}
