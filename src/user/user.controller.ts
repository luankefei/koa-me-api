/**
 * 用户路由
 */
import crypto from "crypto";
import { TypeORMError } from "typeorm";

import { UserService } from "./user.service";
import { IUser } from "../interface/user.interface";

/**
 * 生成随机字符串
 * @param length 生成随机字符串的长度
 */
export function createNonceStr(length: number) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let str = "";
  const charsLen = chars.length;
  for (let i = 0; i < length; i++) {
    const start = Math.floor(Math.random() * charsLen);
    str = str + chars.slice(start, start + 1);
  }
  return str;
}

/*
 * 10位盐
 * 时间戳(2)+随机字母(8)
 */
const generateSalt = () => {
  const suffix = Date.now() % 100;
  const prefix = createNonceStr(8);

  return prefix + suffix;
};

const md5 = (text) => {
  return crypto.createHash("md5").update(String(text)).digest("hex");
};

const encrypt = (password, salt) => {
  return md5(md5(password) + salt);
};

export class UserController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  // @post @body
  createUser(user: IUser): Promise<IUser> {
    const salt = generateSalt();
    const password = encrypt(user.password, salt);
    user.password = password;
    user.salt = salt;
    return this.userService.create(user);
  }

  findOne(username: string): Promise<IUser> {
    return this.userService.findOne(username);
  }

  findAll(): Promise<IUser[]> {
    return this.userService.findAll();
  }

  async validateUser(username: string, pass: string): Promise<IUser | null> {
    const user = await this.findOne(username);

    if (user && user.password === encrypt(pass, user.salt)) {
      delete user.password;
      delete user.salt;
      return user;
    }
    return null;
  }

  async login(username: string, password: string): Promise<string> {
    const result = await this.validateUser(username, password);
    const salt = generateSalt();
    const userNameHash = encrypt(username, salt);
    if (result === null) {
      throw new TypeORMError("UnauthorizedException 401");
    }

    return userNameHash;
  }
}
