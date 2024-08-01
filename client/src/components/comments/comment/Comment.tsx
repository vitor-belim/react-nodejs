import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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
  const [containerHeight, setContainerHeight] = useState(""); // Start height as empty (i.e. 'auto')
  const [showViewMoreBtn, setShowViewMoreBtn] = useState(false);
  const [viewMoreIsOpen, setViewMoreIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let { auth } = useContext(AuthContext);
  const ref = useRef<HTMLDivElement | null>(null);

  const viewMoreHeight = 115;
  const viewMorePaddingBottom = 50;

  useEffect(() => {
    let measured = ref.current?.clientHeight || 0;

    const showViewMoreBtn = measured > viewMoreHeight;

    if (showViewMoreBtn) {
      measured += 30; // Extra padding - padding bottom grows from 20px to 50px = 30px
      measured += 2; // Extra borders - 1px top and 1px bottom = 2px
    }

    setShowViewMoreBtn(showViewMoreBtn);
    setContainerHeight(`${measured}px`);
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

  const handleViewMoreToggle = () => {
    setViewMoreIsOpen((val) => !val);
  };

  return (
    <div
      className="comment-container"
      ref={ref}
      style={{
        height:
          showViewMoreBtn && !viewMoreIsOpen
            ? `${viewMoreHeight}px`
            : containerHeight,
        paddingBottom:
          showViewMoreBtn && viewMoreIsOpen ? `${viewMorePaddingBottom}px` : "",
      }}
    >
      <span className="body">{comment.commentBody}</span>
      <Link to={`/profile/${comment.user.id}`} className="author">
        {comment.user.username}
      </Link>

      {auth.status &&
        (auth.user?.id === post.user.id ||
          auth.user?.id === comment.user.id) && (
          <div className="delete" onClick={deleteHandler}>
            <FontAwesomeIcon icon={faTrash} />
          </div>
        )}

      {showViewMoreBtn && (
        <div className="view-more" onClick={handleViewMoreToggle}>
          <span>{viewMoreIsOpen ? "View less" : "View more"}</span>
        </div>
      )}

      <Spinner isLoading={isLoading} size={SpinnerSize.SMALL} />
    </div>
  );
};

export default Comment;
