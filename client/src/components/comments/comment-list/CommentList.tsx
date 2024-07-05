import React from "react";
import CommentModel from "../../../models/comment-model";
import PostModel from "../../../models/post-model";
import Spinner from "../../spinner/Spinner";
import CommentAdd from "../comment/Comment";
import "./CommentList.scss";

interface CommentListProps {
  post: PostModel;
  comments: CommentModel[];
  onDeleteComment: (comment: CommentModel) => void;
  isLoading?: boolean;
}

const CommentList = ({
  post,
  comments,
  onDeleteComment,
  isLoading = false,
}: CommentListProps) => {
  return (
    <div className="comment-list-container">
      {comments.map((comment) => (
        <CommentAdd
          key={comment.id}
          post={post}
          comment={comment}
          onDelete={(comment) => onDeleteComment && onDeleteComment(comment)}
        />
      ))}

      <Spinner isLoading={!!isLoading} height={250} />
    </div>
  );
};

export default CommentList;
