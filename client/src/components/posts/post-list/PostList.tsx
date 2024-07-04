import React, { ReactNode } from "react";
import PostModel from "../../../models/post-model";
import Post from "../post/Post";
import "./PostList.css";

interface PostListProps {
  posts: PostModel[];
  onDelete?: (post: PostModel) => void;
  children?: ReactNode;
}

function PostList({
  posts,
  onDelete = undefined,
  children = undefined,
}: PostListProps) {
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
