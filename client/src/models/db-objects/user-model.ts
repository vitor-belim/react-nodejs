import DbItem from "../api/db-item";

export default interface UserModel extends DbItem {
  username: string;
}
