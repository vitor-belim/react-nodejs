import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddComment from "../../../components/comments/AddComment";
import ListComments from "../../../components/comments/ListComments";
import Post from "../../../components/post/Post";
import { LoadingContext } from "../../../helpers/loading-context";
import CommentsService from "../../../services/comments-service";
import PostsService from "../../../services/posts-service";
import "./DetailsPost.css";

function DetailsPost() {
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    PostsService.getPost(id)
      .then((response) => {
        setPost(response.data);
      })
      .catch(() => navigate("/"))
      .finally(() => setIsLoading(false));
  }, [id, navigate]);

  useEffect(() => {
    setIsLoadingComments(true);

    CommentsService.getComments(id)
      .then((response) => {
        setComments(response.data);
      })
      .finally(() => setIsLoadingComments(false));
  }, [id]);

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
          <AddComment postId={post.id} onAddComment={handleCommentAdded} />
          <ListComments
            comments={comments}
            isLoading={isLoadingComments}
            onDeleteComment={handleCommentDeleted}
          />
        </div>
      </div>
    </div>
  );
}

export default DetailsPost;
