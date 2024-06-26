import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostList from "../../../components/posts/post-list/PostList";
import { AuthContext } from "../../../contexts/auth-context";
import { LoadingContext } from "../../../contexts/loading-context";
import PostsService from "../../../services/posts/posts-service";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const { auth } = useContext(AuthContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    setIsLoading(true);

    PostsService.getAllPosts()
      .then((response) => {
        setPosts(response.data);
      })
      .finally(() => {
        setIsReady(true);
        setIsLoading(false);
      });
  }, []);

  if (!isReady || isLoading) {
    return null;
  }

  return (
    <div className="home-page">
      <PostList posts={posts}>
        {auth.status && (
          <Link to="/posts/new">Create the first post ever!</Link>
        )}
      </PostList>
    </div>
  );
};

export default HomePage;
