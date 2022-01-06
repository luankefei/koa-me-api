/**
 * 用户相关服务
 */
// import { Injectable } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
import { Connection, getManager, Repository } from "typeorm";
import { User } from "./user.entity";
// import { getTypeORM } from "../db/mysql.db";
import { IUser } from "../interface/user.interface";

// @Injectable()
export class UserService {
  // private readonly connection = getTypeORM("me");

  // connection.getRepository(User)

  // TODO: 这里有问题
  private readonly userRepository: Repository<User>;

  constructor() {
    // @InjectRepository(User)

    this.userRepository = getManager().getRepository(User);
    console.log("after connection");
    // console.log("getManager", getManager());
    // this.userRepository = getManager().getRepository(User);
  }

  create(user: IUser): Promise<User> {
    const temp = new User();
    temp.email = user.email;
    temp.level = 0;
    temp.nickname = user.nickname;
    temp.password = user.password;
    temp.salt = user.salt;
    temp.username = user.username;

    return this.userRepository.save(temp);
  }

  findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ username });
  }

  findAll(): Promise<User[]> {
    // return Promise.resolve([new User()]);
    return this.userRepository.find();
  }

  // async validateUser(username: string, pass: string): Promise<any> {
  //   const user = await this.findOne(username);
  //   if (user && user.password === pass) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }

  // async login(user: any) {
  //   const payload = { username: user.username,  };
  //   return this.validateUser();
  // }
}
