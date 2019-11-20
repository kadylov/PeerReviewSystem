import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

// models
import {DataTableWorkModel} from "../models/datatable-work.model";
import {HttpClient} from "@angular/common/http";

// const API_DATATABLE_URL = 'api/works'
const API_DATATABLE_URL = 'http://localhost:80/index.php';
@Injectable()
export class DataTableWorkService {


	constructor(private http: HttpClient) {
	}

	public getAllWorks(): Observable<DataTableWorkModel[]> {
		return this.http.get<DataTableWorkModel[]>(API_DATATABLE_URL);
	}
}
