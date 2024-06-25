import {
  Model,
  Table,
  Column,
  DataType,
  BelongsToMany,
} from "sequelize-typescript";
import { Organizer } from "./organizer.model";
import { HackerEventOrganizer } from "./hackerEventOrganizer.model";

@Table({
  tableName: HackerEvent.HACKEREVENT_TABLE_NAME,
})
export class HackerEvent extends Model {
  public static HACKEREVENT_TABLE_NAME = "hackerevents" as string;
  public static HACKEREVENT_ID = "id" as string;
  public static HACKEREVENT_NAME = "name" as string;
  public static HACKEREVENT_DESCRIPTION = "description" as string;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: HackerEvent.HACKEREVENT_ID,
  })
  id!: number;

  @Column({
    type: DataType.STRING(100),
    field: HackerEvent.HACKEREVENT_NAME,
  })
  name!: string;

  @Column({
    type: DataType.STRING(500),
    field: HackerEvent.HACKEREVENT_DESCRIPTION,
  })
  description!: string;

  @BelongsToMany(() => Organizer, () => HackerEventOrganizer)
  organizers!: Organizer[];
}
