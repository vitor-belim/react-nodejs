import React from "react";
import "./ListComments.css";
import Spinner from "../spinner/Spinner";
import Comment from "./Comment";

const ListComments = ({
  post,
  comments,
  onDeleteComment,
  isLoading = false,
}) => {
  return (
    <div className="list-comments-container">
      {comments.map((comment) => (
        <Comment
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

export default ListComments;
