import { ILogin } from './ILogin';

export default interface IUser extends ILogin {
  id: number,
  role: string,
  username: string
}
