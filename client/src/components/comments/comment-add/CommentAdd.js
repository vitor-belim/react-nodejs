import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import CommentsService from "../../../services/comments/comments-service";
import "./CommentAdd.css";
import Spinner from "../../spinner/Spinner";

function CommentAdd({ post, onAddComment = null }) {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!post.allowComments) {
      return;
    }

    setIsLoading(true);

    CommentsService.addCommentToPost(post.id, comment)
      .then((response) => {
        setComment("");
        onAddComment && onAddComment(response.data);
      })
      .catch((err) => err)
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="add-comment-container">
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder={
            post.allowComments
              ? "Add a comment..."
              : "Comments are not allowed in this post."
          }
          disabled={!post.allowComments}
          autoComplete="off"
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit" disabled={!post.allowComments}>
          <FontAwesomeIcon icon={faMessage} /> Add Comment
        </button>
      </form>

      <Spinner isLoading={isLoading} height={80} size="small" />
    </div>
  );
}

export default CommentAdd;
