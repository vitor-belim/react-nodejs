import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommentsContainer from "../../../components/comments/comments-container/CommentsContainer";
import Header from "../../../components/header/Header";
import Post from "../../../components/posts/post/Post";
import { LoadingContext } from "../../../contexts/loading-context";
import PostModel from "../../../models/db-objects/post-model";
import PostsService from "../../../services/posts/posts-service";
import "./DetailsPostPage.scss";

function DetailsPostPage() {
  const [post, setPost] = useState<PostModel>();
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const params = useParams();
  let navigate = useNavigate();

  const id = parseInt(params.id || "");

  useEffect(() => {
    setIsLoading(true);

    PostsService.getPost(id)
      .then(({ data: dbPost }) => {
        setPost(dbPost);
      })
      .catch(() => navigate("/"))
      .finally(() => setIsLoading(false));
  }, [id, navigate, setIsLoading]);

  if (!post || isLoading) {
    return null;
  }

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
          <CommentsContainer post={post} />
        </div>
      </div>
    </div>
  );
}

export default DetailsPostPage;
