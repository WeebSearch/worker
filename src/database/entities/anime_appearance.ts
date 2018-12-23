/* tslint:disable */

import {
  AutoIncrement,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

import Anime from "./anime";
import Character from "./character";

@Table({
  tableName: "anime_appearances",
  underscored: true
})
export default class AnimeAppearance extends Model<AnimeAppearance> {
  @AutoIncrement @PrimaryKey @Column
  public readonly id: number;

  @Column @ForeignKey(() => Character)
  public readonly characterId: string;

  @Column @ForeignKey(() => Anime)
  public readonly animeId: string;
}
