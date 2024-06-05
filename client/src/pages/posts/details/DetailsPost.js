import React, { useEffect, useState } from "react";
import Post from "../../../components/post/Post";
import { useParams } from "react-router-dom";
import PostsService from "../../../services/posts-service";
import "./DetailsPost.css";
import ListComments from "../../../components/comments/ListComments";
import AddComment from "../../../components/comments/AddComment";

function DetailsPost() {
  const [post, setPost] = useState();
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const { id } = useParams();

  useEffect(() => {
    PostsService.getPost(id).then((response) => {
      setPost(response.data);
    });
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="column">
        <Post post={post} canNavigate={false} large />
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
