import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { Event } from "./Event";

@Table({
  tableName: Hackerspace.HACKERSPACE_TABLE_NAME,
})
export class Hackerspace extends Model {
  public static HACKERSPACE_TABLE_NAME = "hackerspaces" as string;
  public static HACKERSPACE_ID = "id" as string;
  public static HACKERSPACE_NAME = "name" as string;
  public static HACKERSPACE_CITY = "city" as string;

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

  @HasMany(() => Event, "hackerspaceId")
  events!: Event[];
}
