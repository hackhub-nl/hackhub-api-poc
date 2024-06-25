import {
  Model,
  Table,
  Column,
  DataType,
  BelongsToMany,
} from "sequelize-typescript";
import { HackerEvent } from "./hackerEvent.model";
import { HackerEventOrganizer } from "./hackerEventOrganizer.model";

@Table({
  tableName: Organizer.ORGANIZER_TABLE_NAME,
})
export class Organizer extends Model {
  public static ORGANIZER_TABLE_NAME = "organizers" as string;
  public static ORGANIZER_ID = "id" as string;
  public static ORGANIZER_NAME = "name" as string;
  public static ORGANIZER_DESCRIPTION = "description" as string;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: Organizer.ORGANIZER_ID,
  })
  id!: number;

  @Column({
    type: DataType.STRING(100),
    field: Organizer.ORGANIZER_NAME,
  })
  name!: string;

  @Column({
    type: DataType.STRING(500),
    field: Organizer.ORGANIZER_DESCRIPTION,
  })
  description!: string;

  @BelongsToMany(() => HackerEvent, () => HackerEventOrganizer)
  hackerEvents!: HackerEvent[];
}
