import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[ktFocus]'
})
export class FocusDirective {

	constructor(private el: ElementRef) {
		// console.log(this.el);
	}

	@HostListener('focus',['$event']) onClick(event: Event) {
		console.log(event);
		// event.o
	}

}
