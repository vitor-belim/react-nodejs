import React, { useEffect, useState } from "react";
import CommentsService from "../../services/comments-service";
import "./ListComments.css";
import Comment from "./Comment";

const ListComments = ({ postId, lastRefresh = new Date() }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    CommentsService.getComments(postId).then((response) => {
      setComments(response.data);
    });
  }, [postId, lastRefresh]);

  const handleCommentDeleted = (deletedComment) => {
    setComments((comments) =>
      comments.filter((comment) => comment.id !== deletedComment.id),
    );
  };

  return (
    <div className="list-comments-container">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onDelete={handleCommentDeleted}
        />
      ))}
    </div>
  );
};

export default ListComments;
