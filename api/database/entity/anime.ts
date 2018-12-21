import { Entity } from "typeorm";

/* tslint:disable */
@Entity('animes')
export class Anime {
  public readonly id: number;
  public readonly anilist_id: string;
  public readonly mal_id: string;
  public readonly filename: string;
  public readonly views: number;
  public readonly isPublished: boolean;
}
