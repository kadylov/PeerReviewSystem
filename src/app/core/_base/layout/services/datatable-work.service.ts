import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

// models
import {DataTableWorkModel} from "../models/datatable-work.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, retry} from "rxjs/operators";

// const API_DATATABLE_URL = 'api/works'
const API_DATATABLE_URL = 'http://3.95.8.94/example/index.php';

@Injectable()
export class DataTableWorkService {


	constructor(private http: HttpClient) {
	}


	public getAllWorks(
		// filter = '', sortOrder = 'asc', pageNumber = 0, pageSize = 3

	): Observable<DataTableWorkModel[]> {
		return this.http.get<DataTableWorkModel[]>(API_DATATABLE_URL,{params:{scoredWorks: 'scoredWorks'}}).pipe(retry(3));

		// public getAllWorks(
		//     // filter = '', sortOrder = 'asc', pageNumber = 0, pageSize = 3
		// ): Observable<DataTableWorkModel[]> {
		//
		//
		//     return this.http.get<DataTableWorkModel[]>(API_DATATABLE_URL);

		// 	return this.http.get(API_DATATABLE_URL, {
		//
		// 		params: new HttpParams()
		// 			.set('filter', filter)
		// 			.set('sortOrder', sortOrder)
		// 			.set('pageNumber', pageNumber.toString())
		// 			.set('pageSize', pageSize.toString())
		// }).pipe(map(res=>res["payload"]));

	}

}
/*

WID: number;
	Title: string;
	URL: string;
	DateSubmission: string;
	DateWritten: string;
	IsRetired: string;
	Status: string;
	AuthorName: string;
	AuthorEmail: string;
	Tag: string;
	RSID: null;
	Score: number
 */

    // findLessons(
    //     courseId: number, filter = '', sortOrder = 'asc',
    //     pageNumber = 0, pageSize = 3): Observable<Work[]> {
	//
    //     return this.http.get('/api/lessons', {
    //         params: new HttpParams()
    //             .set('courseId', courseId.toString())
    //             .set('filter', filter)
    //             .set('sortOrder', sortOrder)
    //             .set('pageNumber', pageNumber.toString())
    //             .set('pageSize', pageSize.toString())
    //     }).pipe(
    //         map(res => res["payload"])
    //     );
    // }
