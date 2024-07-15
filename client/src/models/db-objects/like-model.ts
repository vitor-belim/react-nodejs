import DbItem from "../api/db-item";
import UserModel from "./user-model";

export default interface LikeModel extends DbItem {
  user: UserModel;
}
