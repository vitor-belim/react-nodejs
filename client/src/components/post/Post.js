import React from "react";
import "./Post.css";
import { useNavigate } from "react-router-dom";

function Post({ post, large = false, canNavigate = true }) {
  let navigate = useNavigate();

  return (
    <div
      className={`post ${large && "large"}`}
      onClick={() => canNavigate && navigate(`/posts/${post.id}`)}
    >
      <div className="title">{post.title}</div>
      <div className="body">{post.postText}</div>
      <div className="footer">@{post.username}</div>
    </div>
  );
}

export default Post;
