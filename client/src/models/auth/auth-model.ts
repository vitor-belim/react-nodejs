import UserModel from "../db-objects/user-model";

export default interface AuthModel {
  status: boolean;
  checked: boolean;
  user?: UserModel;
}
