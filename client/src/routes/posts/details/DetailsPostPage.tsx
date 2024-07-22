import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommentAdd from "../../../components/comments/comment-add/CommentAdd";
import CommentList from "../../../components/comments/comment-list/CommentList";
import Header from "../../../components/header/Header";
import Post from "../../../components/posts/post/Post";
import { AuthContext } from "../../../contexts/auth-context";
import { LoadingContext } from "../../../contexts/loading-context";
import CommentModel from "../../../models/db-objects/comment-model";
import PostModel from "../../../models/db-objects/post-model";
import PageHelper from "../../../models/pagination/page-helper";
import CommentsService from "../../../services/comments/comments-service";
import PostsService from "../../../services/posts/posts-service";
import "./DetailsPostPage.scss";

function DetailsPostPage() {
  const [post, setPost] = useState<PostModel>();
  const [commentsPage, setCommentsPage] = useState(
    PageHelper.emptyPage<CommentModel>(),
  );
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const { auth } = useContext(AuthContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const params = useParams();
  let navigate = useNavigate();

  const id = parseInt(params.id || "");

  const loadComments = useCallback(
    (page: number) => {
      setIsLoadingComments(true);

      CommentsService.getComments(id, {
        params: { page, limit: commentsPage.limit },
      })
        .then(({ data: dbCommentsPage }) => {
          if (page === 0) {
            setCommentsPage(dbCommentsPage);
          } else {
            setCommentsPage((_commentsPage) =>
              PageHelper.paginate(_commentsPage, dbCommentsPage),
            );
          }
        })
        .finally(() => setIsLoadingComments(false));
    },
    [id, commentsPage.limit],
  );

  useEffect(() => {
    setIsLoading(true);

    PostsService.getPost(id)
      .then(({ data: dbPost }) => {
        setPost(dbPost);

        const commentsAreAllowed = dbPost.allowComments;
        const loggedUserIsPostOwner =
          auth.status && dbPost.user.id === auth.user?.id;

        if (commentsAreAllowed || loggedUserIsPostOwner) {
          loadComments(0);
        }
      })
      .catch(() => navigate("/"))
      .finally(() => setIsLoading(false));
  }, [id, navigate, setIsLoading, auth, loadComments]);

  if (!post || isLoading) {
    return null;
  }

  const commentsAreAllowed = post.allowComments;
  const loggedUserIsPostOwner = auth.status && post.user.id === auth.user?.id;

  return (
    <div className="details-post-page">
      <Header title="Post Details" />

      <div className="columns">
        <div className="column">
          <Post
            post={post}
            canNavigate={false}
            large
            onDelete={() => navigate("/")}
          />
        </div>

        <div className="column">
          <div className="comments-container">
            {commentsAreAllowed ? (
              <CommentAdd post={post} onAddComment={() => loadComments(0)} />
            ) : (
              <>
                <h3>Comments are not allowed in this post.</h3>
                {commentsPage.items.length > 0 && (
                  <p>
                    Since you are the owner of this post, you can review and
                    delete existing comments.
                    <br />
                    Other users won't be able to see these comments unless the
                    "Allow Comments" option is turned back on.
                  </p>
                )}
              </>
            )}

            {(commentsAreAllowed || loggedUserIsPostOwner) && (
              <CommentList
                post={post}
                commentsPage={commentsPage}
                isLoading={isLoadingComments}
                onDeleteComment={() => loadComments(0)}
                onPaginate={() => loadComments(commentsPage.page + 1)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsPostPage;
