import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import CommentsService from "../../services/comments-service";
import "./AddComment.css";
import Spinner from "../spinner/Spinner";

function AddComment({ postId, onAddComment = null }) {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    CommentsService.addCommentToPost(postId, comment)
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
          placeholder="Comment"
          autoComplete="off"
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        &nbsp;
        <button type="submit">
          <FontAwesomeIcon icon={faMessage} /> Add Comment
        </button>
      </form>

      <Spinner isLoading={isLoading} height={80} size="small" />
    </div>
  );
}

export default AddComment;
