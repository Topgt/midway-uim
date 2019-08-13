
import { Table, Model, Column, DataType } from 'sequelize-typescript'
import { providerWrapper } from 'midway'

providerWrapper([
  {
    id: 'userModel',
    provider: () => UserModel,
  },
])

export type IuserModel = typeof UserModel

@Table({
  freezeTableName: true,
  tableName: 'user_info'
})
export default class UserModel extends Model<UserModel> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number

  @Column({
    field: 'name',
    type: DataType.STRING(120),
    allowNull: false,
    comment: '用户名',
  })
  name: string

  @Column({
    field: 'alias_name',
    type: DataType.STRING(120),
    allowNull: true,
    comment: '别名',
  })
  alias:string

  @Column({
    field: 'role_type',
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: '2',
    comment: '用户权限',
  })
  roleType: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: '1：有效， 0:无效',
  })
  status: number

}
