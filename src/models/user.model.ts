import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Session } from "./session.model";
import bcrypt from "bcrypt";

@Table({
  tableName: User.USER_TABLE_NAME,
})
export class User extends Model {
  public static USER_TABLE_NAME = "users" as string;
  public static USER_ID = "id" as string;
  public static USER_NAME = "name" as string;
  public static USER_PASSWORD = "password" as string;
  public static USER_EMAIL = "email" as string;
  public static USER_USERNAME = "username" as string;

  public async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt
      .compare(candidatePassword, User.USER_PASSWORD)
      .catch((e) => false);
  }

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: User.USER_ID,
  })
  id!: number;

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
    type: DataType.STRING(100),
    field: User.USER_EMAIL,
  })
  email!: string;

  @Column({
    type: DataType.STRING(100),
    field: User.USER_USERNAME,
  })
  username!: string;

  @HasMany(() => Session, "userId")
  sessions!: Session[];
}
