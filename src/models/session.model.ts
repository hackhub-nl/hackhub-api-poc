import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "./user.model";

@Table({
  tableName: Session.SESSION_TABLE_NAME,
})
export class Session extends Model {
  public static SESSION_TABLE_NAME = "sessions" as string;
  public static SESSION_ID = "id" as string;
  public static SESSION_VALID = "valid" as string;
  public static SESSION_USER_AGENT = "userAgent" as string;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: Session.SESSION_ID,
  })
  id!: number;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
    field: Session.SESSION_VALID,
  })
  valid!: boolean;

  @Column({
    type: DataType.STRING,
    field: Session.SESSION_USER_AGENT,
  })
  userAgent!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}
