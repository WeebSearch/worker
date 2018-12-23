import {
  AutoIncrement, BelongsTo,
  BelongsToMany,
  Column,
  CreatedAt, ForeignKey, HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt
} from "sequelize-typescript";
import Anime from "./anime";
import AnimeAppearance from "./anime_appearance";
import Dialogue from "./dialogue";
import Episode from "./episode";

@Table({
  tableName: "characters",
  underscored: true
})
export default class Character extends Model<Character> {
  @AutoIncrement @PrimaryKey @Column
  public readonly id: number;

  @Column({ allowNull: false, unique: true })
  public readonly anilistId: string;

  @Column
  public readonly name: string;

  @Column
  public readonly thumbnailUrl: string;

  @BelongsToMany(() => Anime, () => AnimeAppearance)
  public readonly animes: Anime[];

  @Column @ForeignKey(() => Episode)
  public readonly episodeId: number;

  @BelongsTo(() => Episode)
  public readonly episode: Episode;

  @HasMany(() => Dialogue)
  public readonly dialogues: Dialogue[];

  @CreatedAt
  public readonly createdAt: Date;

  @UpdatedAt
  public readonly updatedAt: Date;
}
