import React from "react";
import CommentModel from "../../../models/db-objects/comment-model";
import PostModel from "../../../models/db-objects/post-model";
import Page from "../../../models/pagination/page";
import PageHelper from "../../../models/pagination/page-helper";
import Spinner from "../../spinner/Spinner";
import Comment from "../comment/Comment";
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
        <Comment
          key={comment.id}
          post={post}
          comment={comment}
          onDelete={(comment) => onDeleteComment && onDeleteComment(comment)}
        />
      ))}

      {!isLoading && PageHelper.canPaginate(commentsPage) && (
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
