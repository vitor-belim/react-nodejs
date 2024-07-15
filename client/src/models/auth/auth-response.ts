import UserModel from "../db-objects/user-model";

export default interface AuthResponse {
  user: UserModel;
  accessToken: string;
  expiration: string;
}
