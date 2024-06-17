import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Post from "../../../components/post/Post";
import { AuthContext } from "../../../helpers/auth-context";
import PostsService from "../../../services/posts-service";
import "./ListPosts.css";

function ListPosts() {
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    PostsService.getAllPosts().then((response) => {
      setPosts(response.data);
    });
  }, [refresh]);

  return (
    <>
      {posts.length === 0 && (
        <div className="no-posts">
          <h2>There are no posts yet.</h2>
          {auth.status && (
            <h2>
              <Link to="/posts/new">Create the first post ever!</Link>
            </h2>
          )}
        </div>
      )}

      {posts.length > 0 && (
        <div className="posts">
          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onDelete={() => setRefresh(refresh + 1)}
            ></Post>
          ))}
        </div>
      )}
    </>
  );
}

export default ListPosts;
