interface ReviewInterface {
  review_id: number;
  camp_id: number;
  user_id: string;
  rating: number;
  title: string;
  body: string;
  regDate: string;
}

class Review {
  private review_id: number;
  private camp_id: number;
  private user_id: string;
  private rating: number;
  private title: string;
  private body: string;
  private regDate: string;

  constructor(review: ReviewInterface) {
    this.review_id = review.review_id;
    this.camp_id = review.camp_id;
    this.user_id = review.user_id;
    this.rating = review.rating;
    this.title = review.title;
    this.body = review.body;
    this.regDate = review.regDate;
  }

  public setRegDate(regDate: string) {
    this.regDate = regDate;
  }
  public getRegDate() {
    return this.regDate;
  }
}

export { ReviewInterface, Review };
