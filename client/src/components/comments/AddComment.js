import React, { useState } from "react";
import CommentsService from "../../services/comments-service";
import "./AddComment.css";

function AddComment({ postId, onAddComment = null }) {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    CommentsService.addCommentToPost(postId, comment).then((response) => {
      console.log(`Added a comment to post ${postId}!`, response.data);
      setComment("");
      onAddComment && onAddComment(response.data);
    });
  };

  return (
    <div className="add-comment-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Comment"
          autoComplete="off"
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        &nbsp;
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
}

export default AddComment;
