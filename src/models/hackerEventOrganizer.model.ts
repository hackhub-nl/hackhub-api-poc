import {
  Model,
  Column,
  DataType,
  ForeignKey,
  Table,
} from "sequelize-typescript";
import { Organizer } from "./organizer.model";
import { HackerEvent } from "./hackerEvent.model";

@Table({
  tableName: HackerEventOrganizer.HACKEREVENT_ORGANIZER_TABLE_NAME,
})
export class HackerEventOrganizer extends Model {
  public static HACKEREVENT_ORGANIZER_TABLE_NAME =
    "hackerEventOrganizers" as string;
  public static HACKEREVENT_ORGANIZER_ID = "id" as string;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: HackerEventOrganizer.HACKEREVENT_ORGANIZER_ID,
  })
  id!: number;

  @ForeignKey(() => Organizer)
  @Column
  organizerId!: number;

  @(ForeignKey!(() => HackerEvent))
  @Column
  hackerEventId!: number;
}
