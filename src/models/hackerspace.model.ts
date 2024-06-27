import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./user.model";

@Table({
  tableName: Hackerspace.HACKERSPACE_TABLE_NAME,
})
export class Hackerspace extends Model {
  public static HACKERSPACE_TABLE_NAME = "hackerspaces" as string;
  public static HACKERSPACE_ID = "id" as string;
  public static HACKERSPACE_NAME = "name" as string;
  public static HACKERSPACE_CITY = "city" as string;
  public static HACKERSPACE_PROVINCE = "province" as string;
  public static HACKERSPACE_WEBSITE = "website" as string;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: Hackerspace.HACKERSPACE_ID,
  })
  id!: number;

  @Column({
    type: DataType.STRING(100),
    field: Hackerspace.HACKERSPACE_NAME,
  })
  name!: string;

  @Column({
    type: DataType.STRING(100),
    field: Hackerspace.HACKERSPACE_CITY,
  })
  city!: string;

  @Column({
    type: DataType.STRING(100),
    field: Hackerspace.HACKERSPACE_PROVINCE,
  })
  province!: string;

  @Column({
    type: DataType.STRING(100),
    field: Hackerspace.HACKERSPACE_WEBSITE,
  })
  website!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}
