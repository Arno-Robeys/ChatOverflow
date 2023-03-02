import { User } from '../model/user';

const users: User[] = [
  User.create({firstname: 'dummy', lastname: 'dummy', email: 'dummy@gmail.com', password: 'dummy', nickname: 'dummy', userid: 1}),
  User.create({firstname: 'dummy2', lastname: 'dummy2', email: 'dummy2@gmail.com', password: 'dummy2', nickname: 'dummy2', userid: 2}),
];

export class UserDao {
  async createUser(user: User): Promise<User> {
    return User.create({ firstname: user.firstname, lastname: user.lastname, email: user.email, password: user.password, nickname: user.nickname, userid: user.userid });
  }

  async getAllUsers(): Promise<User[]> {
    return users;
  }

  async getUserById(userid: number): Promise<User> {
    return users.find(user => user.userid === userid);
  }

  async deleteUserById(userid: number): Promise<boolean> {
    const index = users.findIndex(u => u.userid === userid);
    if (index === -1) throw new Error('User not found');
    users.splice(index, 1);
    return true;
  }

  async updateUser(user: User): Promise<User> {
    const index = users.findIndex(u => u.userid === user.userid);
    if (index === -1) throw new Error('User not found');
    users[index] = user;
    return user;
  }

}
