export interface RoleType {
  roleId: number
  roleName: string
  roleKey: string
  roleSort: number
  dataScope: string
  menuCheckStrictly: boolean
  deptCheckStrictly: boolean
  status: string
  delFlag: string
  createBy: string
  createTime: string
  updateBy: string
  updateTime: string | null
  remark: string
}

export interface IUserType {
  id: number
  deptId: number
  userName: string
  nickName: string
  userType?: any
  email: string
  phonenumber: string
  sex: string
  avatar: string
  status: number
  loginIp: string
  loginDate: string
  remark: string
  roleIds?: any
  createTime: string
  createBy: string
  updateTime?: any
  updateBy?: any
}
