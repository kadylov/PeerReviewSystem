import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

export class Tag {
	name: string;
	tagOptions: string[] =[];
	formCtrName?: string;

}

@Component({
	selector: 'kt-tags',
	templateUrl: './tags.component.html',
	encapsulation: ViewEncapsulation.None
})
export class TagsComponent implements OnInit{

// Option field
	tagList1 = ['Standard', 'Brand Measurement', 'Outcome'];
	tagList2 = ['Quick read', 'Medium read', 'Long read'];
	tagList3 = ['Basic', 'Intermediate', 'Advanced'];
	tagList4 = ['Volume', 'Impressions', 'Engagements', 'Share of Voice', 'Click-throughs', 'AVE', 'ROI'];
	tagList5 = ['Artificial Intelligence', 'Automated', 'Human', 'Influencer identification and tracking', 'Impact', 'Measurement', 'Monitoring', 'ROI'];
	tagList6 = ['Campaign', 'Crisis', 'CSR', 'Integration', 'Internal communications', 'Ongoing', 'Reputation'];
	tagList7 = ['Analytics', 'Big data', 'Focus group', 'Human coding', 'Measurement', 'Modeling', 'Survey'];

	selectedTagList7 = [];

	tagLists: Tag[] = [
		{
			name: 'Length',
			tagOptions: ['Quick read', 'Medium read', 'Long read'],
			formCtrName: 'lengthTag'

		},
		{
			name: 'Level',
			tagOptions: ['Basic', 'Intermediate', 'Advanced'],
			formCtrName: 'levelTag'
		},
		{
			name: 'Metrics',
			tagOptions: ['Volume', 'Impressions', 'Engagements', 'Share of Voice', 'Click-throughs', 'AVE', 'ROI'],
			formCtrName: 'metricTag'
		},
		{
			name: 'Types',
			tagOptions: ['Artificial Intelligence', 'Automated', 'Human', 'Influencer identification and tracking', 'Impact', 'Measurement', 'Monitoring', 'ROI'],
			formCtrName: 'typesTag'
		},
		{
			name: 'Purpose',
			tagOptions: ['Campaign', 'Crisis', 'CSR', 'Integration', 'Internal communications', 'Ongoing', 'Reputation'],
			formCtrName: 'purposeTag'
		},
		{
			name: 'Methodologies',
			tagOptions: ['Analytics', 'Big data', 'Focus group', 'Human coding', 'Measurement', 'Modeling', 'Survey'],
			formCtrName: 'methodologiesTag'
		},
	];
	chipList: string[] = [];
	selecTags: Tag[] = [];
	tagFormGroup: FormGroup;

	visible = true;
	selectable = true;
	removable = true;

	constructor(private fb: FormBuilder) {

	}

	ngOnInit(): void {


	}

	remove(tag: any, selectedTagList?: any): void {
		console.log('Remove', tag);
		console.log('Remove2', selectedTagList);

		// let index: number = this.selectedTagList2.indexOf(tag);
		// if (index !== -1) {
		// 	this.selectedTagList2.splice(index, 1);
		// }
		// index = this.selectedTagList3.indexOf(tag);
		// if (index !== -1) {
		// 	this.selectedTagList3.splice(index, 1);
		// }
		// index = this.selectedTagList4.indexOf(tag);
		// if (index !== -1) {
		// 	this.selectedTagList4.splice(index, 1);
		// }
		// index = this.selectedTagList5.indexOf(tag);
		// if (index !== -1) {
		// 	this.selectedTagList5.splice(index, 1);
		// }
		// index = this.selectedTagList6.indexOf(tag);
		// if (index !== -1) {
		// 	this.selectedTagList6.splice(index, 1);
		// }


		// let index = this.selectedTagList7.indexOf(tag);
		// if (index !== -1) {
		// 	this.selectedTagList7.splice(index, 1);
			// if (this.selectedTagList7.length < 1) {
			// 	this.selectedTagList7=[];
			// }
			// this.selectedTagList7 = this.selectedTagList7.filter(t => t !== tag);

		// }

		// this.chipList = this.chipList.filter(t => t !== tag.name);
	}

}
