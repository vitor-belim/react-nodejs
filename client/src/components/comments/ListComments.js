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

  return (
    <div className="list-comments-container">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default ListComments;
