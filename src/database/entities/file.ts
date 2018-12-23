import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column, CreatedAt,
  ForeignKey, HasMany,
  Model,
  PrimaryKey,
  Table, UpdatedAt
} from "sequelize-typescript";
import Anime from "./anime";
import AnimeAppearance from "./anime_appearance";
import Dialogue from "./dialogue";
import Episode from "./episode";
import Download from "./download";

@Table({
  tableName: "files",
  underscored: true
})
export default class File extends Model<File> {
  @AutoIncrement @PrimaryKey @Column
  public readonly id: number;

  @Column({ allowNull: false, unique: true })
  public readonly fileName: string;

  @Column
  public readonly linkUrl: string;

  @Column({ allowNull: false }) @ForeignKey(() => Anime)
  public readonly animeId: number;

  @BelongsTo(() => Anime)
  public readonly anime: Anime;

  @Column({ allowNull: false }) @ForeignKey(() => Episode)
  public readonly episodeId: number;

  @BelongsTo(() => Episode)
  public readonly episode: Episode;

  @Column @ForeignKey(() => Download)
  public readonly downloadId?: number;

  @BelongsTo(() => Download)
  public readonly download?: Download;

  @CreatedAt
  public readonly createdAt: Date;

  @UpdatedAt
  public readonly updatedAt: Date;
}
