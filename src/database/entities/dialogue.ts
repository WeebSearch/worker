/* tslint:disable */
import {
  AutoIncrement, BelongsTo,
  Column,
  CreatedAt, ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt
} from "sequelize-typescript";
import Anime from "./anime";
import Character from "./character";
import Episode from "./episode";


@Table({
  tableName: "dialogues",
  underscored: true
})
export default class Dialogue extends Model<Dialogue> {
  @AutoIncrement @PrimaryKey @Column
  public readonly id: number;

  @Column({ allowNull: false })
  public readonly text: string;

  @Column({ allowNull: false })
  public readonly order: number;

  @Column @ForeignKey(() => Character)
  public readonly characterId: number;

  @BelongsTo(() => Character)
  public readonly character: Character;

  @Column @ForeignKey(() => Anime)
  public readonly animeId: number;

  @BelongsTo(() => Anime)
  public readonly anime: Anime;

  @Column @ForeignKey(() => Episode)
  public readonly episodeId: number;

  @BelongsTo(() => Episode)
  public readonly episode: Episode;

  @CreatedAt
  public readonly createdAt: Date;

  @UpdatedAt
  public readonly updatedAt: Date;
}
