export interface MalHintItems {
  readonly id: number;
  readonly type: string;
  readonly name: string;
  readonly url: string;
  readonly image_url: string;
  readonly thumbnail_url: string;
  readonly payload: {
    readonly media_type: string;
    readonly start_year: number;
    readonly aired: string;
    readonly score: string;
    readonly status: string;
  };
  readonly es_score: number;
}

export interface MalHintSearchResponse {
  readonly categories: Array<{
    readonly type: string;
    readonly items: MalHintItems[];
  }>;
}

interface AnilistCharacter {
  readonly id: string;
  readonly name: {
    readonly first?: string;
    readonly last?: string;
    readonly native?: string;
  };
}

export interface AnilistCharacterResponse {
  readonly Media: {
    readonly characters: {
      readonly nodes: AnilistCharacter[]
    }
  };
}
