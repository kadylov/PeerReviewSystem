import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
// import {Work} from "./work";
import  {Work} from "./work.model";

@Injectable({
	providedIn: 'root'
})
export class WorkService {

	works: Work[] = [
		{
			"id": 1,
			"title": "Social media",
			"url": "www.google.com/social",
			"dateWritten": "2019-11-03",
			"dateSubmission": "2019-11-11",
			"author": "Mercos E",
			"score": 4.88
		},
		{
			"id": 2,
			"title": "Angular in action",
			"url": "www.google.com/social1",
			"dateWritten": "2019-04-23",
			"dateSubmission": "2019-11-12",
			"author": "Fedelman M., Fisher A.",
			"score": 4.33
		},
		{
			"id": 3,
			"title": "Water problem in Kilamanjaro",
			"url": "www.google.com/social2",
			"dateWritten": "2019-01-03",
			"dateSubmission": "2019-09-06",
			"author": "Eddie Mercos",
			"score": 4.48
		}

	]

	constructor() {
	}

	public getWorks(): any {
		const worksObservable = new Observable(observer =>{
			setTimeout(() => {
				observer.next(this.works);
			}, 1000);
		});

		return worksObservable;
	}
}
