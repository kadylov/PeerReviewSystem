import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {saveAs} from 'file-saver';
import {FileBackupService} from '../../../core/file-service/file-backup.service';
import {Subject} from 'rxjs';
import {debounce, debounceTime} from 'rxjs/operators';

const backup_file_name = 'prs_backup.sql';

@Component({
	selector: 'kt-backupDb',
	templateUrl: './export-import-db.component.html',
	styleUrls: ['./export-import-db.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ExportImportDbComponent implements OnInit {

	file: File = null;
	disableUploadBtn: boolean = true;
	confMsg: string = '';


	private _success = new Subject<string>();

	uploadResponse = {status: '', message: ''};
	error: string = '';

	constructor(
		private fileBackupService: FileBackupService) {
	}

	ngOnInit(): void {

		this._success.subscribe(msg => this.confMsg = msg);

		this._success.pipe(
			debounceTime(2000)
		).subscribe(() => {
			this.confMsg = ''
			console.log('Conifg ', this.confMsg);
		});
	}

	download() {
		this.fileBackupService.download()
			.subscribe(res => {
					saveAs(res, backup_file_name);
				},
				res => {
					// notify error
				}
			);

	}


	fileChange(fileSelected: any) {
		if (fileSelected.target.files.length > 0) {
			this.file = <File> fileSelected.target.files[0];
			this.disableUploadBtn = false;
		} else {
			this.disableUploadBtn = true;
		}
	}

	upload() {

		if (this.file != null) {
			let formData = new FormData();
			formData.append('prs_backup', this.file);

			this.fileBackupService.upload(formData).subscribe(
				res => {
					this._success.next('The database has been restored succcessfully.');
					// this.confMsg = 'The database has been restored succcessfully.';

				},
				error => this.error
			);
		}

	}

}
