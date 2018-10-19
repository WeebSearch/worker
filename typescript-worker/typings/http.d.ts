export interface MalHintItems {
  id: number;
  type: string;
  name: string;
  url: string;
  image_url: string;
  thumbnail_url: string;
  payload: {
    media_type: string;
    start_year: number;
    aired: string;
    score: string;
    status: string;
  };
  es_score: number;
}

export interface MalHintSearchResponse {
  categories: Array<{
    type: string;
    items: MalHintItems[];
  }>;
}
