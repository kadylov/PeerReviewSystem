import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
// import {Work} from "./work";

@Injectable({
	providedIn: 'root'
})
export class WorkService {


	constructor() {
	}

	public getWorks(): any {
		const worksObservable = new Observable(observer =>{
			setTimeout(() => {
				// observer.next(this.works);
			}, 1000);
		});

		return worksObservable;
	}
}
