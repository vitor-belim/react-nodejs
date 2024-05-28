import React from "react";
import "./Post.css";

function Post({ post }) {
  return (
    <div className="post">
      <div className="title">{post.title}</div>
      <div className="body">{post.postText}</div>
      <div className="footer">{post.username}</div>
    </div>
  );
}

export default Post;
