export class TagModel {
	TID?: number;
	Title: string;
	TagList: string [];
	isMultiple?: boolean;


	clear?() {
		this.TagList = [];
	}
}
