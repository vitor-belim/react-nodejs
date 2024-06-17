import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./Comment.css";
import { AuthContext } from "../../helpers/auth-context";
import CommentsService from "../../services/comments-service";

const Comment = ({ comment, onDelete }) => {
  const ref = useRef(null);
  const [showViewMoreBtn, setShowViewMoreBtn] = useState(false);
  const [viewMore, setViewMore] = useState(false);
  let { auth } = useContext(AuthContext);

  useEffect(() => {
    setShowViewMoreBtn(ref.current.clientHeight > 96);
  }, []);

  const deleteHandler = () => {
    let confirmation = window.confirm(
      "Are you sure you want to delete this comment?",
    );

    if (confirmation) {
      CommentsService.deleteComment(comment.id)
        .then(() => {
          onDelete && onDelete(comment);
        })
        .catch((err) => err);
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
    </div>
  );
};

export default Comment;
