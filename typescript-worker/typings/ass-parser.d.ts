export interface AssInfo {
  Title: string;
  ScriptType: string;
  WrapStyle: string;
  PlayResX: string;
  PlayResY: string;
  ScaledBorderAndShadow: 'yes' | 'no';
}

export interface AssStyle {
  format: string[];
  style: any[][]; // TODO: find out
}

export interface AssText {
  raw: string;
  combined: string;
  parsed: {
    tags: string[];
    text: string;
    drawing: any[];
  };
}

export interface AssDialogue {
  Layer: number;
  Start: number;
  End: number;
  Style: string;
  Name: string;
  MarginL: number;
  MarginR: number;
  MarginV: number;
  Effect: any; // don't know
  Text: AssText;
}

export interface AssEvents {
  format: string[];
  comment: string[];
  dialogue: AssDialogue[];
}


export interface AssFile {
  info: AssInfo;
  styles: AssStyle;
  events: AssEvents;
}

interface NameSortedDialogues {
  [name: string]: AssDialogue[];
}

export interface Grouped<T> {
  [name: string]: T;
}

type FileMatches = Array<[string, string]>;

type MatchedFile = [string, string, string];

export declare function parse(content: string): AssFile;

