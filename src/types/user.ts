export interface DeptType {
  deptId: number;
  parentId: number;
  ancestors: string;
  deptName: string;
  orderNum: number;
  leader: string;
  phone: string;
  email: string;
  status: string;
  delFlag: string;
  createBy: string;
  createTime: string;
  updateBy: string;
  updateTime: string;
}

export interface RoleType {
  roleId: number;
  roleName: string;
  roleKey: string;
  roleSort: number;
  dataScope: string;
  menuCheckStrictly: boolean;
  deptCheckStrictly: boolean;
  status: string;
  delFlag: string;
  createBy: string;
  createTime: string;
  updateBy: string;
  updateTime: string | null;
  remark: string;
}

export interface UserType {
  userId: number;
  deptId: number;
  userName: string;
  nickName: string;
  userType: string;
  email: string;
  phonenumber: string;
  sex: string;
  avatar: string;
  password: string;
  status: string;
  delFlag: string;
  loginIp: string;
  loginDate: string;
  createBy: string;
  createTime: string;
  updateBy: string;
  updateTime: string;
  remark: string;
  dept: DeptType;
  roles: RoleType[];
}
