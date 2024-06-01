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
      <div className="title">
        <span>{post.title}</span>
      </div>
      <div className="body">
        <p>{post.postText}</p>
      </div>
      <div className="footer">@{post.username}</div>
    </div>
  );
}

export default Post;
