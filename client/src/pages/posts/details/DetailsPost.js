import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddComment from "../../../components/comments/AddComment";
import ListComments from "../../../components/comments/ListComments";
import Post from "../../../components/post/Post";
import PostsService from "../../../services/posts-service";
import "./DetailsPost.css";

function DetailsPost() {
  const [post, setPost] = useState();
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    PostsService.getPost(id)
      .then((response) => {
        setPost(response.data);
      })
      .catch(() => navigate("/"));
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
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
          <AddComment
            postId={post.id}
            onAddComment={() => setLastRefresh(new Date())}
          />
          <ListComments postId={post.id} lastRefresh={lastRefresh} />
        </div>
      </div>
    </div>
  );
}

export default DetailsPost;
