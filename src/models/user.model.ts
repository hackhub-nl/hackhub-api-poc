import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Session } from "./session.model";

@Table({
  tableName: User.USER_TABLE_NAME,
})
export class User extends Model {
  public static USER_TABLE_NAME = "users" as string;
  public static USER_ID = "id" as string;
  public static USER_EMAIL = "email" as string;
  public static USER_NAME = "name" as string;
  public static USER_PASSWORD = "password" as string;
  public static USER_CREATED_AT = "createdAt" as string;
  public static USER_UPDATED_AT = "updatedAt" as string;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: User.USER_ID,
  })
  id!: number;

  @Column({
    type: DataType.STRING(100),
    field: User.USER_EMAIL,
  })
  email!: string;

  @Column({
    type: DataType.STRING(100),
    field: User.USER_NAME,
  })
  name!: string;

  @Column({
    type: DataType.STRING(100),
    field: User.USER_PASSWORD,
  })
  password!: string;

  @Column({
    type: DataType.DATE,
    field: User.USER_CREATED_AT,
  })
  createdAt!: Date;

  @Column({
    type: DataType.DATE,
    field: User.USER_UPDATED_AT,
  })
  updatedAt!: Date;

  @HasMany(() => Session, "userId")
  sessions!: Session[];
}
