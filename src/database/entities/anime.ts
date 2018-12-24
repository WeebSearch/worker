import {
  AllowNull,
  AutoIncrement,
  BelongsToMany,
  Column,
  CreatedAt, HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt
} from "sequelize-typescript";
import CharacterDiscovery from "./character_discovery";

/* tslint:disable */

@Table({
  tableName: "animes",
})
export default class Anime extends Model<Anime> {
  @AutoIncrement @PrimaryKey @Column
  public readonly id: number;

  @Column({ unique: true })
  public readonly rawName: string;

  @Column
  public readonly anilistId: number;

  @Column
  public readonly malId: number;

  @Column
  public readonly thumbnailUrl: string;

  @CreatedAt
  public readonly createdAt: Date;

  @UpdatedAt
  public readonly updatedAt: Date;
}


