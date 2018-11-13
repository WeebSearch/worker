// interface AnimeCommit {
//   readonly anilistId: number | string;
//   readonly malId: number | string;
//   readonly rawName: string;
// }

import {
  CharacterCreateInput,
  CharacterUpdateInput,
  CharacterUpdateWithWhereUniqueWithoutAnimesInput,
  CharacterWhereUniqueInput
} from "../../api/generated/prisma";
import { AssDialogue, FuseMatch, NameSortedDialogues, ParsedDialogue } from "./ass-parser";
import { AnilistCharacter } from "./http";

export interface CharacterCommit {
  readonly certainty?: number;
  readonly rawName: string;
  readonly name: string;
  readonly thumbnailUrl?: string;
  readonly anilistId?: number;
  readonly dialogues: DialogueCommit[];
  readonly episodes: { readonly connect: { readonly id: string } };
}


export interface DialogueCommit extends ParsedDialogue {
  readonly anime: { readonly connect: { readonly id: string } };
  readonly episode: { readonly connect: { readonly id: string } };
}

export interface CommitPayload {
  readonly subGroup: string;
  readonly episode: string;
  readonly animeName: string;
  readonly downloadUrl: string;
  readonly path: string;
  readonly fileName: string;
  readonly malId: number;
  readonly anilistId: number;
  readonly episodeLength: number;
  readonly archivePath?: string;
  readonly thumbnailUrl?: string;
  readonly file: {
    readonly characters: Array<FuseMatch<AnilistCharacter>>;
    readonly dialogues: NameSortedDialogues;
  };
}

export type PartialPayload = Partial<CommitPayload>;

export interface UpsertCharacterInput {
  readonly where: CharacterWhereUniqueInput;
  readonly create: CharacterCreateInput;
  readonly update: CharacterUpdateInput;
}
