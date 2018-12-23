import {
  AutoIncrement,
  Column,
  CreatedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table, UpdatedAt
} from "sequelize-typescript";
import File from "./file";

@Table({
  tableName: "downloads",
  underscored: true
})
export default class Download extends Model<Download> {
  @AutoIncrement @PrimaryKey @Column
  public readonly id: number;

  @Column({ allowNull: false })
  public readonly url: string;

  @HasMany(() => File)
  public readonly files: File[];

  @CreatedAt
  public readonly createdAt: Date;

  @UpdatedAt
  public readonly updatedAt: Date;
}
