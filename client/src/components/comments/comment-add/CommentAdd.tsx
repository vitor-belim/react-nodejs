import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FormEvent, useState } from "react";
import CommentModel from "../../../models/comment-model";
import PostModel from "../../../models/post-model";
import SpinnerSize from "../../../models/spinner-size";
import CommentsService from "../../../services/comments/comments-service";
import Spinner from "../../spinner/Spinner";
import "./CommentAdd.css";

interface CommentAddProps {
  post: PostModel;
  onAddComment?: (comment: CommentModel) => void;
}

function CommentAdd({ post, onAddComment = undefined }: CommentAddProps) {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!post.allowComments) {
      return;
    }

    setIsLoading(true);

    CommentsService.addCommentToPost(post.id, comment)
      .then((dbComment) => {
        setComment("");
        onAddComment && onAddComment(dbComment);
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

      <Spinner isLoading={isLoading} height={80} size={SpinnerSize.SMALL} />
    </div>
  );
}

export default CommentAdd;
