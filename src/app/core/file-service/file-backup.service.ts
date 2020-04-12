import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


const downloadUrl = 'http://3.95.8.94/example/download_request.php';
const uploadUrl = 'http://3.95.8.94/example/upload_request.php';


@Injectable()
export class FileBackupService {

	constructor(private http: HttpClient) {
	}

	// upload(formData: FormData):Observable<any> {
	// 	return this.http.post(uploadUrl, formData);
	// }

	upload(formData: FormData):Observable<any> {
		return this.http.post(uploadUrl, formData, {
			reportProgress:true,
			observe: 'events'
		}).pipe(
			map(event=>{
				switch (event.type) {

					case HttpEventType.UploadProgress:
						const progress = Math.round(100 * event.loaded / event.total);
						return {status: 'progress', message: progress};

					case HttpEventType.Response:
						return event.body;

					default:
						return `Unhandled event: ${event.type}`

				}
			})
		);
	}

	download(): Observable<any> {

		return this.http.get(downloadUrl, {responseType: 'blob'});
	}
}
