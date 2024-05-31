import React, { useEffect, useRef, useState } from "react";
import "./Comment.css";

const Comment = ({ comment }) => {
  const ref = useRef(null);
  const [showViewMoreBtn, setShowViewMoreBtn] = useState(false);
  const [viewMore, setViewMore] = useState(false);

  useEffect(() => {
    setShowViewMoreBtn(ref.current.clientHeight > 96);
  }, []);

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
      {comment.commentBody}
      {showViewMoreBtn && (
        <div className="view-more" onClick={viewMoreHandler}>
          <span>{!viewMore ? "View more" : "View less"}</span>
        </div>
      )}
    </div>
  );
};

export default Comment;
