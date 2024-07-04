import UserModel from "../user-model";

export default interface AuthResponse {
  message: string;
  user: UserModel;
  accessToken: string;
  expiration: string;
}
