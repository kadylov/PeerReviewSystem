import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kt-public-page',
  templateUrl: './public-page.component.html',
  styleUrls: ['./public-page.component.scss']
})
export class PublicPageComponent implements OnInit {
	title: string = 'The Highest Scored Works';

  constructor() { }

  ngOnInit(): void {

  }

}
