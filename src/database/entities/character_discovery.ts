import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey, HasMany, HasOne,
  Model,
  PrimaryKey,
  Table,
  Validate
} from "sequelize-typescript";
import Character from "./character";
import Dialogue from "./dialogue";
import Episode from "./episode";
import Anime from "./anime";

@Table({
  tableName: "character_discoveries",
  underscored: true
})
export default class CharacterDiscovery extends Model<CharacterDiscovery> {
  @AutoIncrement @PrimaryKey @Column
  public readonly id: number;

  @Column({ allowNull: true }) @ForeignKey(() => Character)
  public readonly characterId: number;

  @Column({ allowNull: false }) @ForeignKey(() => Episode)
  public readonly episodeId: number;

  @BelongsTo(() => Episode)
  public readonly episode: Episode;

  @BelongsTo(() => Character)
  public readonly character?: Character;

  @HasMany(() => Dialogue)
  public readonly dialogues: Dialogue[];

  @Column
  public readonly name: string;

  @Validate({ min: 0, max: 100 }) @Column
  public readonly certainty: number;
}
