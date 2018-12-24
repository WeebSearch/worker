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
import CharacterDiscovery from "./character_discovery";

@Table({
  tableName: "characters",
  underscored: true
})
export default class Character extends Model<Character> {
  @AutoIncrement @PrimaryKey @Column
  public readonly id: number;

  @Column({ allowNull: false, unique: true })
  public readonly anilistId: number;

  @Column
  public readonly name: string;

  @Column
  public readonly thumbnailUrl: string;

  @HasMany(() => CharacterDiscovery)
  public readonly characterDiscovery: CharacterDiscovery;

  @CreatedAt
  public readonly createdAt: Date;

  @UpdatedAt
  public readonly updatedAt: Date;
}
