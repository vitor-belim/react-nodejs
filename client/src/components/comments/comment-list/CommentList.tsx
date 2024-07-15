import React from "react";
import CommentModel from "../../../models/db-objects/comment-model";
import PostModel from "../../../models/db-objects/post-model";
import Page from "../../../models/pagination/page";
import Spinner from "../../spinner/Spinner";
import CommentAdd from "../comment/Comment";
import "./CommentList.scss";

interface CommentListProps {
  post: PostModel;
  commentsPage: Page<CommentModel>;
  onDeleteComment: (comment: CommentModel) => void;
  onPaginate?: () => void;
  isLoading?: boolean;
}

const CommentList = ({
  post,
  commentsPage,
  onDeleteComment,
  onPaginate = undefined,
  isLoading = false,
}: CommentListProps) => {
  return (
    <div className="comment-list-container">
      {commentsPage.items.map((comment) => (
        <CommentAdd
          key={comment.id}
          post={post}
          comment={comment}
          onDelete={(comment) => onDeleteComment && onDeleteComment(comment)}
        />
      ))}

      {!isLoading && commentsPage.canPaginate() && (
        <button
          className="paginate-button secondary"
          onClick={() => onPaginate?.()}
        >
          Load more
        </button>
      )}

      <Spinner isLoading={!!isLoading} height={250} />
    </div>
  );
};

export default CommentList;
