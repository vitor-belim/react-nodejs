import UserModel from "../user-model";

export default interface AuthModel {
  status: boolean;
  checked: boolean;
  user?: UserModel;
}
