import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";

// models
import {DataTableWorkModel} from "../models/datatable-work.model";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, map, retry} from "rxjs/operators";
import {User} from "../../../auth";

// const API_DATATABLE_URL = 'api/works'
const API_DATATABLE_URL = 'http://3.95.8.94/example/index.php';

@Injectable()
export class DataTableWorkService {


    constructor(private http: HttpClient) {
    }


    public getAllWorks(
        // filter = '', sortOrder = 'asc', pageNumber = 0, pageSize = 3

    ): Observable<DataTableWorkModel[]> {
        return this.http.get<DataTableWorkModel[]>(API_DATATABLE_URL, {params: {scoredWorks: 'scoredWorks'}}).pipe(retry(3),
            catchError(err => {
                return of(null);
            }));

    }


    // updateUser(_user: User): Observable<any> {
    //     const httpHeaders = new HttpHeaders();
    //     httpHeaders.set('Content-Type', 'application/json');
    //     return this.http.put(API_USERS_URL, _user, {headers: httpHeaders}).pipe(
    //         catchError(err => {
    //             return of(null);
    //         })
    //     );
    // }
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
