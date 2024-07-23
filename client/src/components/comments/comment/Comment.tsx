import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../contexts/auth-context";
import CommentModel from "../../../models/db-objects/comment-model";
import PostModel from "../../../models/db-objects/post-model";
import SpinnerSize from "../../../models/enums/spinner-size";
import CommentsService from "../../../services/comments/comments-service";
import Spinner from "../../spinner/Spinner";
import "./Comment.scss";

interface CommentAddProps {
  post: PostModel;
  comment: CommentModel;
  onDelete: (comment: CommentModel) => void;
  key?: string | number;
}

const Comment = ({ post, comment, onDelete }: CommentAddProps) => {
  const [showViewMoreBtn, setShowViewMoreBtn] = useState(false);
  const [viewMore, setViewMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let { auth } = useContext(AuthContext);
  const ref = useRef<HTMLDivElement | null>(null);

  const viewMoreHeight = 100;

  useEffect(() => {
    setShowViewMoreBtn(
      !!ref.current?.clientHeight && ref.current?.clientHeight > viewMoreHeight,
    );
  }, [viewMoreHeight]);

  const deleteHandler = () => {
    let confirmation = window.confirm(
      "Are you sure you want to delete this comment?",
    );

    if (confirmation) {
      setIsLoading(true);

      CommentsService.deleteComment(comment.id)
        .then(() => {
          onDelete && onDelete(comment);
        })
        .catch((err) => err)
        .finally(() => setIsLoading(false));
    }
  };

  const viewMoreHandler = () => {
    setViewMore((val) => !val);
  };

  return (
    <div
      className="comment-container"
      ref={ref}
      style={{
        maxHeight: showViewMoreBtn && !viewMore ? `${viewMoreHeight}px` : "",
        paddingBottom: showViewMoreBtn && viewMore ? "50px" : "",
      }}
    >
      <span className="body">{comment.commentBody}</span>
      <span className="author">@{comment.user.username}</span>

      {auth.status &&
        (auth.user?.id === post.user.id ||
          auth.user?.id === comment.user.id) && (
          <div className="delete" onClick={deleteHandler}>
            <FontAwesomeIcon icon={faTrash} />
          </div>
        )}

      {showViewMoreBtn && (
        <div className="view-more" onClick={viewMoreHandler}>
          <span>{!viewMore ? "View more" : "View less"}</span>
        </div>
      )}

      <Spinner isLoading={isLoading} size={SpinnerSize.SMALL} />
    </div>
  );
};

export default Comment;
