import {Component, ViewEncapsulation} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {saveAs} from 'file-saver';

	const url = 'http://3.95.8.94/example/backup_request.php';


@Component({
	selector: 'kt-backupDb',
	templateUrl: './export-import-db.component.html',
	styleUrls:['./export-import-db.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ExportImportDbComponent {
	fileUploadProgress: any;
	previewUrl: any;
	uploadedFilePath: any;


	constructor(private http: HttpClient) {
	}

	onSubmit(){
		this.http.get(url, {responseType: 'blob'})
			.subscribe(res => {
					// const blob = new Blob([res], { type : 'application/zip' });
					// const file = new File([blob], 'fileName' + '.jpeg', { type: 'image/jpeg' });
					saveAs(res,'backup.sql');
				},
				res => {
					// notify error
				}
			);

	}


	fileProgress($event: Event) {

	}

	fileChange(event) {

	}

}
