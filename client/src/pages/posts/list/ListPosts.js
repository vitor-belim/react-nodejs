import React, { useEffect, useState } from "react";
import Post from "../../../components/post/Post";
import PostsService from "../../../services/posts-service";
import "./ListPosts.css";

function ListPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    PostsService.getAllPosts().then((response) => {
      setPosts(response.data);
    });
  }, []);

  return (
    <div className="posts">
      {posts.map((post) => (
        <Post key={post.id} post={post}></Post>
      ))}
    </div>
  );
}

export default ListPosts;
