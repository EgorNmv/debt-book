export interface Paginate<T> {
  data: Array<T>;
  total: number;
  currentCount: number;
  paginate: {
    nextUrl: string;
    previousUrl?: string;
  };
}
