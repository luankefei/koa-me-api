/**
 * 用户相关服务
 */
import { getManager, Repository } from "typeorm";
import { User } from "./user.entity";
import { IUser } from "../interface/user.interface";

// @Injectable()
export class UserService {
  private readonly userRepository: Repository<User>;

  constructor() {
    this.userRepository = getManager().getRepository(User);
  }

  create(user: IUser): Promise<User> {
    const temp = new User();
    temp.email = user.email;
    temp.level = 0;
    temp.nickname = user.nickname;
    temp.password = user.password;
    temp.salt = user.salt;
    temp.username = user.username;
    temp.avatar = user.avatar;

    return this.userRepository.save(temp);
  }

  findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ username });
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
