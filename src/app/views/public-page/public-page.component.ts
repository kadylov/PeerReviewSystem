import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Work} from '../author/model/work';
import {Subscription} from 'rxjs';
import {DataTableWorkService} from '../../core/_base/layout';

@Component({
  selector: 'kt-public-page',
  templateUrl: './public-page.component.html',
  styleUrls: ['./public-page.component.scss']
})
export class PublicPageComponent implements OnInit, OnDestroy {
	title: string = 'The Highest Scored Works';

	displayedColumns = ['Tags', 'Title', 'AuthorName', 'Score'];
	dataSource: MatTableDataSource<Work>;
	works: any = [];

	wSub: Subscription;

	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;


	tagList = [];
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
