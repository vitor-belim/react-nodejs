import React, { useEffect, useState } from "react";
import Post from "../../../components/post/Post";
import { useParams } from "react-router-dom";
import PostsService from "../../../services/posts-service";
import "./DetailsPost.css";

function DetailsPost() {
  const [post, setPost] = useState();

  const { id } = useParams();

  useEffect(() => {
    PostsService.getPost(id).then((response) => {
      console.log(`Retrieved post with id ${id}!`, response.data);
      setPost(response.data);
    });
  }, [id]);

  return (
    <div className="container">
      <div className="col-left">
        {post && <Post post={post} canNavigate={false} large />}
      </div>
      <div className="col-right">Will contain comment section</div>
    </div>
  );
}

export default DetailsPost;
