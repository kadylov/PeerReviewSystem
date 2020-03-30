import {TagModel} from '../_models/tag.model';

// Angular
import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
// RxJS
import {Observable, of, forkJoin, throwError} from 'rxjs';
import {map, catchError, mergeMap, tap} from 'rxjs/operators';


const API_TAGS_URL = 'api/tags';


@Injectable()
export class TagService {


	constructor(private http: HttpClient) { }

	getAllTags(): Observable<TagModel[]>{
		return this.http.get<TagModel[]>(API_TAGS_URL);
	}
}
