import UserModel from "./user-model";

export default interface CommentModel {
  id: number;
  commentBody: string;
  user: UserModel;
}
