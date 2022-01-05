export interface IUser {
  uid: number;
  username: string;
  nickname: string;
  email: string;
  password?: string;
  salt: string;
  level: number;
}
