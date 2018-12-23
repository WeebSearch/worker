import { AutoIncrement, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table, Validate } from "sequelize-typescript";
import Anime from "./anime";
import Character from "./character";
import Episode from "./episode";

@Table({
  tableName: "character_discoveries",
  underscored: true
})
export default class CharacterDiscovery extends Model<CharacterDiscovery> {
  @AutoIncrement @PrimaryKey @Column
  public readonly id: number;

  @Column({ allowNull: false }) @ForeignKey(() => Episode)
  public readonly episodeId: number;

  @BelongsTo(() => Episode)
  public readonly episode: Episode;

  @Column({ allowNull: true }) @ForeignKey(() => Character)
  public readonly characterId: number;

  @BelongsTo(() => Character)
  public readonly character?: Character;

  @Column
  public readonly name: string;

  @Validate({ min: 0, max: 100 }) @Column
  public readonly certainty: number;
}
