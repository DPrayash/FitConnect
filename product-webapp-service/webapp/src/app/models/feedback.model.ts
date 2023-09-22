export class Feedback {
    id: String;
    customerName: string;

    feedbackTitle: string;
    feedbackDescription: string;
    feedbackRemarks: string;
    ratings: number;

    constructor(id: String, customerName: string, feedbackTitle: string, feedbackDescription: string, feedbackRemarks: string, ratings: number) {
        this.id = id;
        this.customerName = customerName;
        this.feedbackTitle = feedbackTitle;
        this.feedbackDescription = feedbackDescription;
        this.feedbackRemarks = feedbackRemarks;
        this.ratings = ratings;
    }
}