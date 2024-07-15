import DbItem from "../api/db-item";
import UserModel from "./user-model";

export default interface CommentModel extends DbItem {
  commentBody: string;
  user: UserModel;
}
