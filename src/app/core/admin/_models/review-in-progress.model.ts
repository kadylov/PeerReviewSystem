import {AssignmentModel} from './assignment.model';

export class ReviewInProgressModel extends AssignmentModel {
	Reviewers?: Reviewer[];
	DateAssigned?: string;
	DueDate: string;
}


export class Reviewer {
	ReviewerID: number;
	ReviewerName: string;
	Role: string;
	Credential?: string;
	ReviewedThisMonth?: string;
	TotalReviews?: string;

}
