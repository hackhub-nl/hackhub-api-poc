import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: Event.EVENT_TABLE_NAME,
})
export class Event extends Model {
  public static EVENT_TABLE_NAME = "events" as string;
  public static EVENT_ID = "id" as string;
  public static EVENT_NAME = "name" as string;
  public static EVENT_DESCRIPTION = "description" as string;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: Event.EVENT_ID,
  })
  id!: number;

  @Column({
    type: DataType.STRING(100),
    field: Event.EVENT_NAME,
  })
  name!: string;

  @Column({
    type: DataType.STRING(500),
    field: Event.EVENT_DESCRIPTION,
  })
  description!: string;
}
