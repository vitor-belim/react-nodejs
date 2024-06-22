import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./Comment.css";
import { AuthContext } from "../../helpers/auth-context";
import CommentsService from "../../services/comments-service";
import Spinner from "../spinner/Spinner";

const Comment = ({ comment, onDelete }) => {
  const [showViewMoreBtn, setShowViewMoreBtn] = useState(false);
  const [viewMore, setViewMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let { auth } = useContext(AuthContext);
  const ref = useRef(null);

  useEffect(() => {
    setShowViewMoreBtn(ref.current.clientHeight > 96);
  }, []);

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
      className="comment"
      ref={ref}
      style={{
        maxHeight: showViewMoreBtn && !viewMore ? "72px" : "",
        paddingBottom: showViewMoreBtn && viewMore ? "50px" : "",
      }}
    >
      <span className="body">{comment.commentBody}</span>
      <span className="author">@{comment.user.username}</span>

      {auth.status && comment.user.id === auth.user.id && (
        <button className="delete" onClick={deleteHandler}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      )}

      {showViewMoreBtn && (
        <div className="view-more" onClick={viewMoreHandler}>
          <span>{!viewMore ? "View more" : "View less"}</span>
        </div>
      )}

      <Spinner isLoading={isLoading} size="small" />
    </div>
  );
};

export default Comment;
