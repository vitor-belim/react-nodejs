import LikeModel from "./like-model";
import TagModel from "./tag-model";
import UserModel from "./user-model";

export default interface PostModel {
  id: number;
  title: string;
  postText: string;
  allowComments: boolean;

  user: UserModel;
  tags: TagModel[];
  likes: LikeModel[];
}
