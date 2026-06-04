export interface StatisticsOverview {
  totalReviews: number;
  currentMonthReviews: number;
  reviewsPerGenre: CountByGenre[];
  averageScore: number;
}

export interface StatisticsMonthly {
  reviewsPerMonth: number[];
}

export interface CountByGenre {
  genre: string;
  count: number;
}