import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommentAdd from "../../../../components/comments/comment-add/CommentAdd";
import CommentList from "../../../../components/comments/comment-list/CommentList";
import Post from "../../../../components/posts/post/Post";
import { AuthContext } from "../../../../contexts/auth-context";
import { LoadingContext } from "../../../../contexts/loading-context";
import CommentModel from "../../../../models/comment-model";
import PostModel from "../../../../models/post-model";
import CommentsService from "../../../../services/comments/comments-service";
import PostsService from "../../../../services/posts/posts-service";
import "./DetailsPostPage.scss";

function DetailsPostPage() {
  const [post, setPost] = useState<PostModel>();
  const [comments, setComments] = useState<CommentModel[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const { auth } = useContext(AuthContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const params = useParams();
  let navigate = useNavigate();

  const id = parseInt(params.id || "");

  useEffect(() => {
    setIsLoading(true);

    PostsService.getPost(id)
      .then((apiResponse) => {
        setPost(apiResponse.data);

        const commentsAreAllowed = apiResponse.data.allowComments;
        const loggedUserIsPostOwner =
          auth.status && apiResponse.data.user.id === auth.user?.id;

        if (commentsAreAllowed || loggedUserIsPostOwner) {
          setIsLoadingComments(true);

          CommentsService.getComments(id)
            .then((apiResponse) => {
              setComments(apiResponse.data);
            })
            .finally(() => setIsLoadingComments(false));
        }
      })
      .catch(() => navigate("/"))
      .finally(() => setIsLoading(false));
  }, [id, navigate, auth, setIsLoading]);

  const handleCommentAdded = (addedComment: CommentModel) => {
    setComments((comments) => [addedComment, ...comments]);
  };

  const handleCommentDeleted = (deletedComment: CommentModel) => {
    setComments((comments) =>
      comments.filter((comment) => comment.id !== deletedComment.id),
    );
  };

  if (!post || isLoading) {
    return null;
  }

  const commentsAreAllowed = post.allowComments;
  const loggedUserIsPostOwner = auth.status && post.user.id === auth.user?.id;

  return (
    <div className="details-post-page">
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
            <CommentAdd post={post} onAddComment={handleCommentAdded} />
          ) : (
            <>
              <h3>Comments are not allowed in this post.</h3>
              {comments.length > 0 && (
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
              comments={comments}
              isLoading={isLoadingComments}
              onDeleteComment={handleCommentDeleted}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailsPostPage;
