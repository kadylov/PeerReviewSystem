import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

// models
import {DataTableWorkModel} from '../models/datatable-work.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, retry, tap} from 'rxjs/operators';

// const API_DATATABLE_URL = 'api/works'
const API_DATATABLE_URL = 'http://3.95.8.94/example/index.php';

@Injectable()
export class DataTableWorkService {


	constructor(private http: HttpClient) {
	}


	public getAllWorks(): Observable<DataTableWorkModel[]> {
		return this.http.get<DataTableWorkModel[]>(API_DATATABLE_URL, {params: {scoredWorks: 'scoredWorks'}}).pipe(
			retry(3),

			map(works => {
				works.map((dtw) => {

					dtw.Tags = this.convertToArray(dtw.Tags);
				});
				return works;
			})
		);
	}


	private convertToArray(str: string[]) {
		let ls: string = Object.assign(str);
		str = ls.split(',');
		return str;
	}

}

