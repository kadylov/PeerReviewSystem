// Angular
import { Injectable } from '@angular/core';
// Angular in memory
import { InMemoryDbService } from 'angular-in-memory-web-api';
// RxJS
import { Observable } from 'rxjs';
// Auth
import { AuthDataContext } from '../../../../auth';
// ECommerce
import { ECommerceDataContext } from '../../../../e-commerce';
// Models
import { CarsDb } from './fake-db/cars';

import {WorksDb} from "./fake-db/works";
import {TagsComponent} from '../../../../../views/author/tag-selections/tags.component';
import {TagTable} from '../../../../author/_server/tag.table';
import {TagDb} from './fake-db/tags';
import {ReviewHistoryDb} from './fake-db/reviewHistory';

@Injectable()
export class FakeApiService implements InMemoryDbService {
	/**
	 * Service Constructore
	 */
	constructor() {}

	/**
	 * Create Fake DB and API
	 */
	createDb(): {} | Observable<{}> {
		// tslint:disable-next-line:class-name
		const db = {
			// auth module
			users: AuthDataContext.users,
			roles: AuthDataContext.roles,
			permissions: AuthDataContext.permissions,

			// e-commerce
			// customers
			customers: ECommerceDataContext.customers,
			// products
			products: ECommerceDataContext.cars,
			productRemarks: ECommerceDataContext.remarks,
			productSpecs: ECommerceDataContext.carSpecs,

			// orders
			orders: ECommerceDataContext.orders,

			// data-table
			cars: CarsDb.cars,

			works: WorksDb.works,

			tags: TagDb.tags,

			reviewHistory: ReviewHistoryDb.history,
		};
		return db;
	}
}
