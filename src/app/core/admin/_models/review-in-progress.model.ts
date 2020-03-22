import {AssignmentModel} from './assignment.model';

export class ReviewInProgressModel extends AssignmentModel {
	// ReviewerIDs: any[];
	// ReviewerNames: string[];
	// DateAssigned?: string[];
	// DueDate: string[];

	// ReviewerID: number;
	// ReviewerName: string;
	// DateAssigned?: string;
	// DueDate: string;

	Reviewers?: Reviewer[];
	DateAssigned?: string;
	DueDate: string;
}


export class Reviewer {
	ReviewerID: number;
	ReviewerName: string;
	Role: string;

}
