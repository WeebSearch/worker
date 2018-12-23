import {
  AllowNull,
  AutoIncrement,
  BelongsToMany,
  Column,
  CreatedAt,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt
} from "sequelize-typescript";
import Character from "./character";
import AnimeAppearance from "./anime_appearance";

/* tslint:disable */

@Table({
  tableName: "animes",
  underscoredAll: true,
  underscored: true
})
export default class Anime extends Model<Anime> {
  @AutoIncrement @PrimaryKey @Column
  public readonly id: number;

  @Column
  public readonly rawName: string;

  @Column
  public readonly anilistId: string;

  @Column
  public readonly malId: string;

  @Column
  public readonly name: string;

  @Column
  public readonly thumbnailUrl: string;

  @BelongsToMany(() => Character, () => AnimeAppearance)
  public readonly characters: Character[];

  @CreatedAt
  public readonly createdAt: Date;

  @UpdatedAt
  public readonly updatedAt: Date;
}


