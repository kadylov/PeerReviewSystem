import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import {DataTableWorkModel, DataTableWorkService} from "../../../../core/_base/layout";


/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
    selector: 'kt-work-list',
    templateUrl: './work-list.component.html',
    styleUrls: ['./work-list.component.scss']
})
export class WorkListComponent implements OnInit {
    displayedColumns = ['Tag', 'Title', 'AuthorName', 'Score'];
    dataSource: MatTableDataSource<DataTableWorkModel>;
    works: any = [];

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(private workService: DataTableWorkService) {
        this.dataSource = new MatTableDataSource();

    }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.loadWorks();
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }


    loadWorks() {
        this.workService.getAllWorks()
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

