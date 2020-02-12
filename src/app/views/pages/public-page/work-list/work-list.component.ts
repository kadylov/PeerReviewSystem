import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import {DataTableWorkModel, DataTableWorkService} from '../../../../core/_base/layout';
import {Subscription} from 'rxjs';
import {delay} from 'rxjs/operators';


/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
	selector: 'kt-work-list',
	templateUrl: './work-list.component.html',
	styleUrls: ['./work-list.component.scss']
})
export class WorkListComponent implements OnInit, OnDestroy {
	displayedColumns = ['Tag', 'Title', 'AuthorName', 'Score'];
	dataSource: MatTableDataSource<DataTableWorkModel>;
	works: any = [];

	wSub: Subscription;

	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;


	tagList4 = ['Volume', 'Impressions', 'Engagements', 'Share of Voice', 'Click-throughs', 'AVE', 'ROI'];
	selectable: boolean = false;
	removable: boolean = false;

	constructor(private workService: DataTableWorkService) {
		this.dataSource = new MatTableDataSource();

	}

	ngOnInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;

		this.loadWorks();
	}

	ngOnDestroy(): void {
		this.wSub.unsubscribe();
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}


	loadWorks() {
		this.wSub = this.workService.getAllWorks()
			.subscribe(
				res => {
					this.dataSource.data = res;
					this.dataSource.sort = this.sort;
					this.dataSource.paginator = this.paginator;

					// console.log("AAAA");
					// console.log(this.dataSource.data);
				},
				error => {
					console.log('There was an error while retrieving Posts !!!' + error);
				});
	}
}

