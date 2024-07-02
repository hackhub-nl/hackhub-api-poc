import {
  BeforeCreate,
  BeforeUpdate,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Session } from "./session.model";
import { Hackerspace } from "./hackerspace.model";
import bcrypt from "bcrypt";
import config from "config";

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

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(user: User) {
    if (user.password) {
      const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
      user.password = await bcrypt.hashSync(user.password, salt);
    }
  }

  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt
      .compare(candidatePassword, this.password)
      .catch((err) => false);
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
    unique: true,
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
