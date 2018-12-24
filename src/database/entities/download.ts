import {
  AutoIncrement,
  Column,
  CreatedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table, UpdatedAt
} from "sequelize-typescript";
import Episode from "./episode";

@Table({
  tableName: "downloads",
  underscored: true
})
export default class Download extends Model<Download> {
  @AutoIncrement @PrimaryKey @Column
  public readonly id: number;

  @Column({ allowNull: false })
  public readonly url: string;

  @HasMany(() => Episode)
  public readonly files: Episode[];

  @CreatedAt
  public readonly createdAt: Date;

  @UpdatedAt
  public readonly updatedAt: Date;
}
