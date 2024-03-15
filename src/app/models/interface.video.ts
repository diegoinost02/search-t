export interface Video {
    id: number;
    results: Results[];
  }
  
  export interface Results {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
  }

  // {
  //   "id": 200,
  //   "results": [
  //     {
  //       "iso_639_1": "en",
  //       "iso_3166_1": "US",
  //       "name": "Star Trek: Insurrection (1998) Original Trailer [FHD]",
  //       "key": "gm2M8oUrEyg",
  //       "site": "YouTube",
  //       "size": 1080,
  //       "type": "Trailer",
  //       "official": false,
  //       "published_at": "2021-12-24T20:42:58.000Z",
  //       "id": "62d0c005f056d500b5ec4754"
  //     }
  //   ]
  // }