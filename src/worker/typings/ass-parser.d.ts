export interface AssInfo {
  readonly Title: string;
  readonly ScriptType: string;
  readonly WrapStyle: string;
  readonly PlayResX: string;
  readonly PlayResY: string;
  readonly ScaledBorderAndShadow: "yes" | "no";
}

export interface AssStyle {
  readonly format: string[];
  readonly style: any[][]; // TODO: find out
}

type URL = string;
type PATH = string;
export type SavedFile = [URL, PATH];

export interface AssText {
  readonly raw: string;
  readonly combined: string;
  readonly parsed: {
    readonly tags: string[];
    readonly text: string;
    readonly drawing: any[];
  };
}

export interface AssDialogue {
  readonly Layer: number;
  readonly Start: number;
  readonly End: number;
  readonly Style: string;
  readonly Name: string;
  readonly MarginL: number;
  readonly MarginR: number;
  readonly MarginV: number;
  readonly Effect: any; // don't know
  readonly Text: AssText;
}

export interface AssEvents {
  readonly format: string[];
  readonly comment: string[];
  readonly dialogue: AssDialogue[];
}


export interface AssFile {
  readonly info: AssInfo;
  readonly styles: AssStyle;
  readonly events: AssEvents;
}

interface ParsedDialogue {
  readonly start: number;
  readonly end: number;
  readonly text: string;
  readonly name?: string;
  readonly order: number;
}

interface NameSortedDialogues {
  readonly [name: string]: ParsedDialogue[];
}

export interface Grouped<T> {
  readonly [name: string]: T;
}

type FileMatches = Array<[string, string]>;

type MatchedFile = [string, string, string];

export declare const parse: (content: string) => AssFile;


interface FuseResult<T> {
  readonly item: (T | undefined);
  readonly score: number;
}
type FuseMatch<T> = [string, (FuseResult<T> | undefined)];

