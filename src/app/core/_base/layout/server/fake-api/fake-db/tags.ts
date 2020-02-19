import {TagModel} from '../../../../../author/_models/tag.model';

export class TagDb {
	public static tags: any = [
		{
			'title': 'main',
			'tagList': ['Standard', 'Brand Measurement', 'Outcome'],
			'isMultiple': 'false'
		},
		{
			'title': 'length ',
			'tagList': ['Quick read', 'Medium read', 'Long read'],
			'isMultiple': 'false'

		},
		{
			'title': 'level',
			'tagList': ['Basic', 'Intermediate', 'Advanced'],
			'isMultiple': 'false'
		},
		{
			'title': 'metrics',
			'tagList': ['Volume', 'Impressions', 'Engagements', 'Share of Voice', 'Click-throughs', 'AVE'],
			'isMultiple': 'true'
		},
		{
			'title': 'types',
			'tagList': ['Artificial Intelligence', 'Automated', 'Human', 'Influencer identification and tracking', 'Impact', 'Measurement', 'Monitoring', 'ROI'],
			'isMultiple': 'true'
		},
		{
			'title': 'purpose',
			'tagList': ['Campaign', 'Crisis', 'CSR', 'Integration', 'Internal communications', 'Ongoing', 'Reputation'],
			'isMultiple': 'false'
		},
		{
			'title': 'methodologies',
			'tagList': ['Analytics', 'Big data', 'Focus group', 'Human coding', 'Measurement', 'Modeling', 'Survey'],
			'isMultiple': 'true'
		}
	];
}
