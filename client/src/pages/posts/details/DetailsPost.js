import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddComment from "../../../components/comments/AddComment";
import ListComments from "../../../components/comments/ListComments";
import Post from "../../../components/post/Post";
import { AuthContext } from "../../../helpers/auth-context";
import { LoadingContext } from "../../../helpers/loading-context";
import CommentsService from "../../../services/comments-service";
import PostsService from "../../../services/posts-service";
import "./DetailsPost.css";

function DetailsPost() {
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const { auth } = useContext(AuthContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    PostsService.getPost(id)
      .then(({ data: _post }) => {
        setPost(_post);

        const commentsAreAllowed = _post.allowComments;
        const loggedUserIsPostOwner =
          auth.status && _post.user.id === auth.user.id;

        if (commentsAreAllowed || loggedUserIsPostOwner) {
          setIsLoadingComments(true);

          CommentsService.getComments(id)
            .then(({ data: _comments }) => {
              setComments(_comments);
            })
            .finally(() => setIsLoadingComments(false));
        }
      })
      .catch(() => navigate("/"))
      .finally(() => setIsLoading(false));
  }, [id, navigate, auth]);

  const handleCommentAdded = (addedComment) => {
    setComments((comments) => [addedComment, ...comments]);
  };

  const handleCommentDeleted = (deletedComment) => {
    setComments((comments) =>
      comments.filter((comment) => comment.id !== deletedComment.id),
    );
  };

  if (!post || isLoading) {
    return null;
  }

  const commentsAreAllowed = post.allowComments;
  const loggedUserIsPostOwner = auth.status && post.user.id === auth.user.id;

  return (
    <div className="container">
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
            <AddComment post={post} onAddComment={handleCommentAdded} />
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
            <ListComments
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

export default DetailsPost;
