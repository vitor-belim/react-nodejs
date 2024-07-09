import UserModel from "../user-model";

export default interface AuthResponse {
  user: UserModel;
  accessToken: string;
  expiration: string;
}
