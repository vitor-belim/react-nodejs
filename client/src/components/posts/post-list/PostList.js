import React from "react";
import Post from "../post/Post";
import "./PostList.css";

function PostList({ posts, onDelete, children }) {
  return (
    <>
      {posts.length === 0 && (
        <div className="no-posts">
          <p>No posts were found.</p>
          {children}
        </div>
      )}

      {posts.length > 0 && (
        <div className="posts">
          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onDelete={(post) => onDelete && onDelete(post)}
            ></Post>
          ))}
        </div>
      )}
    </>
  );
}

export default PostList;
