import { FuseMatch, NameSortedDialogues } from "./ass-parser";
import { AnilistCharacter } from "./http";

export interface CommitPayload {
  readonly subGroup: string;
  readonly episode: string;
  readonly animeName: string;
  readonly downloadUrl?: string;
  readonly path: string;
  readonly fileName: string;
  readonly malId?: number;
  readonly anilistId?: number;
  readonly episodeLength: number;
  readonly archivePath?: string;
  readonly thumbnailUrl?: string;
  readonly characters: Array<FuseMatch<AnilistCharacter>>;
  readonly dialogues: NameSortedDialogues;
}

export type PartialPayload = Partial<CommitPayload>;

