/* tslint:disable */
import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey, HasMany,
  Model,
  PrimaryKey,
  Table, UpdatedAt
} from "sequelize-typescript";

import Anime from "./anime";
import Character from "./character";
import Dialogue from "./dialogue";

@Table({
  tableName: "episodes",
  underscored: true
})
export default class Episode extends Model<Episode> {
  @AutoIncrement @PrimaryKey @Column
  public readonly id: number;

  @Column({ comment: 'not always numeric '})
  public readonly episodeNumber: string;

  @Column
  public readonly name: string;

  @Column({ allowNull: false })
  public readonly length: number;

  @Column({ allowNull: false , defaultValue: 'EN' })
  public readonly language: string;

  @Column({ allowNull: false , defaultValue: '__UNKNOWN__' })
  public readonly subGroup: string;

  @Column
  public readonly thumbnailUrl: string;

  @Column({ allowNull: false }) @ForeignKey(() => Anime)
  public readonly animeId: number;

  @HasMany(() => Character)
  public readonly characters: Character[];

  @HasMany(() => Dialogue)
  public readonly dialogues: Dialogue[];

  @BelongsTo(() => Anime)
  public readonly anime: Anime;

  @CreatedAt
  public readonly createdAt: Date;

  @UpdatedAt
  public readonly updatedAt: Date;
}
