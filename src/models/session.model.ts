import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "./user.model";

@Table({
  tableName: Session.SESSION_TABLE_NAME,
})
export class Session extends Model {
  public static SESSION_TABLE_NAME = "session" as string;
  public static SESSION_ID = "id" as string;
  public static SESSION_VALID = "valid" as string;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: Session.SESSION_ID,
  })
  id!: number;

  @Column({
    type: DataType.BOOLEAN,
    field: Session.SESSION_VALID,
  })
  valid!: boolean;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  hackerspaceId!: number;

  @BelongsTo(() => User)
  hackerspace!: User;
}
