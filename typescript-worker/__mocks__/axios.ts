import { MalHintSearchResponse } from "../typings/http";

const data: MalHintSearchResponse = {
  categories: [
    {
      type: 'anime',
      items: [{
        id: 34914,
        type: "anime",
        name: "New Game!!",
        url: "https://myanimelist.net/anime/34914/New_Game",
        image_url: "https://myanimelist.cdn-dena.com/r/116x180/images/anime/4/86790.jpg?s=62a3724f6171c87e4c2350ea483aefff",
        thumbnail_url: "https://myanimelist.cdn-dena.com/r/116x76/images/anime/4/86790.jpg?s=9fff26d9c4d18ade398692c54bf34cb5",
        payload: {
          media_type: "TV",
          start_year: 2017,
          aired: "Jul 11, 2017 to Sep 26, 2017",
          score: "7.90",
          status: "Finished Airing"
        },
        es_score: 16.381521
      },
        {
          id: 31953,
          type: "anime",
          name: "New Game!",
          url: "https://myanimelist.net/anime/31953/New_Game",
          image_url: "https://myanimelist.cdn-dena.com/r/116x180/images/anime/9/80417.jpg?s=0d7c4d09afa391f80cd2a662250da600",
          thumbnail_url: "https://myanimelist.cdn-dena.com/r/116x76/images/anime/9/80417.jpg?s=0b5d39d955aca98df64aa41613562a9d",
          payload: {
            media_type: "TV",
            start_year: 2016,
            aired: "Jul 4, 2016 to Sep 19, 2016",
            score: "7.73",
            status: "Finished Airing"
          },
          es_score: 16.381521
        }]
    }
  ]
};

export default {
  get: jest.fn(async () => ({ data }))
};
