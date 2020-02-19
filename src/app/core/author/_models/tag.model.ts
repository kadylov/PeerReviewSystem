export class TagModel {

	title: string;
	tagList: string [];
	isMultiple?: boolean;


	clear?() {
		this.tagList = [];
	}
}
