/* tslint:disable */
import {
  AutoIncrement,
  BelongsTo, BelongsToMany,
  Column,
  CreatedAt,
  ForeignKey, HasMany,
  Model,
  PrimaryKey,
  Table, UpdatedAt
} from "sequelize-typescript";

import Anime from "./anime";
import Dialogue from "./dialogue";
import CharacterDiscovery from "./character_discovery";
import Download from "./download";

@Table({
  tableName: "episodes",
  underscored: true
})
export default class Episode extends Model<Episode> {
  @AutoIncrement @PrimaryKey @Column
  public readonly id: number;

  @Column({ comment: 'not always numeric' })
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

  @HasMany(() => CharacterDiscovery)
  public readonly characters: CharacterDiscovery[];

  @HasMany(() => Dialogue)
  public readonly dialogues: Dialogue[];

  @BelongsTo(() => Anime)
  public readonly anime: Anime;

  @Column @ForeignKey(() => Download)
  public readonly downloadId?: number;

  @BelongsTo(() => Download)
  public readonly download?: Download;

  @CreatedAt
  public readonly createdAt: Date;

  @UpdatedAt
  public readonly updatedAt: Date;
}
