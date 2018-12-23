export declare type QuerySelector = string;

export interface SpiderOptions {
  readonly targets: string[];
  readonly selector: QuerySelector;
  readonly limit?: number;
  readonly callback: (info: SpiderCallback) => Promise<any>;
  readonly paginate?: QuerySelector;
  readonly respectRobotsTxt?: boolean;
  // userAgent: string;
}

// export interface SpiderResponse {
//   targets: string[];
//   targetPerPage: number;
// }

export interface SpiderCallback {
  readonly cookie: string;
  readonly selections: CheerioElement[];
  readonly processFiles: boolean;
}

export interface SpiderDownloader {
  readonly baseUrl: string;
  readonly processor: (args: SpiderCallback) => Promise<void>;
}
