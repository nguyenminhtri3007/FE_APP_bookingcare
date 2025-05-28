export class ReviewModel {
    historyId: number;
    userId: number;
    rating: number;
    comment: string;

    constructor(historyId: number, userId: number, rating: number, comment: string) {
        this.historyId = historyId;
        this.userId = userId;
        this.rating = rating;
        this.comment = comment;
    }

    convertModelToExecute(data: ReviewModel) {
        return {
            historyId: data.historyId,
            userId: data.userId,
            rating: data.rating,
            comment: data.comment
        }
    }
} 