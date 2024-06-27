import React from "react";
import "./CommentList.css";
import Spinner from "../../spinner/Spinner";
import CommentAdd from "../comment/Comment";

const CommentList = ({
  post,
  comments,
  onDeleteComment,
  isLoading = false,
}) => {
  return (
    <div className="list-comments-container">
      {comments.map((comment) => (
        <CommentAdd
          key={comment.id}
          post={post}
          comment={comment}
          onDelete={(comment) => onDeleteComment && onDeleteComment(comment)}
        />
      ))}

      <Spinner isLoading={isLoading} height={250} />
    </div>
  );
};

export default CommentList;
