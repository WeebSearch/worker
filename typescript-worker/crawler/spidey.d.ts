export declare type QuerySelector = string;

export interface SpiderOptions {
  targets: string[];
  selectors: QuerySelector[];
  limit?: number;
  callback: (info: SpiderCallback) => Promise<void>;
  paginate?: QuerySelector;
  respectRobotsTxt?: boolean;
  // userAgent: string;
}

// export interface SpiderResponse {
//   targets: string[];
//   targetPerPage: number;
// }

export interface SpiderCallback {
  selections: string[];
}
