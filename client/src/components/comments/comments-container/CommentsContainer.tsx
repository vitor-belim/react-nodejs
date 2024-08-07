import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/auth-context";
import CommentModel from "../../../models/db-objects/comment-model";
import PostModel from "../../../models/db-objects/post-model";
import PageHelper from "../../../models/pagination/page-helper";
import CommentsService from "../../../services/comments/comments-service";
import Spinner from "../../spinner/Spinner";
import CommentAdd from "../comment-add/CommentAdd";
import Comment from "../comment/Comment";
import "./CommentsContainer.scss";

interface CommentListProps {
  post: PostModel;
}

interface CommentListLoaders {
  loadingComments: boolean;
  paginatingComments: boolean;
}

const CommentsContainer = ({ post }: CommentListProps) => {
  const [commentsPage, setCommentsPage] = useState(
    PageHelper.empty<CommentModel>(),
  );
  const [loaders, setLoaders] = useState<CommentListLoaders>({
    loadingComments: true,
    paginatingComments: false,
  });
  const { auth } = useContext(AuthContext);

  const loadComments = useCallback(
    (page: number) => {
      setLoaders({
        loadingComments: page === 0,
        paginatingComments: page > 0,
      });

      CommentsService.getComments(post.id, {
        params: { page, limit: commentsPage.limit },
      })
        .then(({ data: dbCommentsPage }) => {
          if (page === 0) {
            setCommentsPage((_commentsPage) => dbCommentsPage);
          } else {
            setCommentsPage((_commentsPage) =>
              PageHelper.paginate(_commentsPage, dbCommentsPage),
            );
          }
        })
        .finally(() =>
          setLoaders({ loadingComments: false, paginatingComments: false }),
        );
    },
    [post.id, commentsPage.limit],
  );

  useEffect(() => {
    if (post.allowComments || (auth.status && post.user.id === auth.user?.id)) {
      loadComments(0);
    }
  }, [
    post.allowComments,
    auth.status,
    post.user.id,
    auth.user?.id,
    loadComments,
  ]);

  return (
    <div className="comments-container">
      {post.allowComments ? (
        <CommentAdd post={post} onAddComment={() => loadComments(0)} />
      ) : (
        <>
          <h3>Comments are not allowed in this post.</h3>

          {auth.status && post.user.id === auth.user?.id && (
            <p>
              Since you are the owner of this post, you can review and delete
              existing comments.
              <br />
              Other users won't be able to see these comments unless the "Allow
              Comments" option is turned back on.
            </p>
          )}
        </>
      )}

      <div className="comment-list-container">
        {commentsPage.items.map((comment) => (
          <Comment
            key={comment.id}
            post={post}
            comment={comment}
            onDelete={() => loadComments(0)}
          />
        ))}

        {!loaders.loadingComments && PageHelper.canPaginate(commentsPage) && (
          <div className="pagination-container">
            {loaders.paginatingComments ? (
              <Spinner isLoading={true} />
            ) : (
              <button
                style={{ opacity: loaders.paginatingComments ? 0 : 1 }}
                className="paginate-button secondary"
                onClick={() => loadComments(commentsPage.page + 1)}
              >
                Load more
              </button>
            )}
          </div>
        )}

        <Spinner isLoading={loaders.loadingComments} height={250} />
      </div>
    </div>
  );
};

export default CommentsContainer;
