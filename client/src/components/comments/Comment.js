import React from "react";
import "./Comment.css";

const Comment = ({ comment }) => {
  return <div className="comment">{comment.commentBody}</div>;
};

export default Comment;
