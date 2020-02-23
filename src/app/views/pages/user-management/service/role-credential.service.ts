import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';


const API_URL = 'http://3.95.8.94/example/admin_request.php';


@Injectable()
export class RoleCredentialService {

	constructor(private http: HttpClient) {
	}


	public getRolesAndCredentialsList(): Observable<any> {
		return this.http.get<any>(API_URL, {params: {getRolesCredential: 'getRolesCredential'}})
	}

}
