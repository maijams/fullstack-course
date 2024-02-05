export interface Diary {
  id: number;
  date: string;
  visibility: string;
  weather: string;
}

export interface NewDiary {
  date: string;
  visibility: string;
  weather: string;
  comment: string;
}