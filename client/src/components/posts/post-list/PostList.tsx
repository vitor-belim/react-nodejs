import React, { ReactNode } from "react";
import PostModel from "../../../models/post-model";
import Post from "../post/Post";
import "./PostList.scss";

interface PostListProps {
  posts: PostModel[];
  onDelete?: (post: PostModel) => void;
  children?: ReactNode;
}

function PostList({
  posts,
  onDelete = undefined,
  children = <p>No posts were found.</p>,
}: PostListProps) {
  return (
    <div className="post-list-container">
      {posts.length === 0 && <div className="no-posts">{children}</div>}

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
    </div>
  );
}

export default PostList;
