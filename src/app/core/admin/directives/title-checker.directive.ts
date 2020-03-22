import {Directive, ElementRef, Input} from '@angular/core';


@Directive({
	selector: '[title-changer]'
})
export class TitleCheckerDirective {

	@Input('title-changer') oldWID:number;
	@Input() newWID:number;

	constructor(private el:ElementRef) {
		console.log(el);
		console.log("Oldtitle ",this.oldWID);
		console.log("NewTITLE ",this.newWID);
	}

}
