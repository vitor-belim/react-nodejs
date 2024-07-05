import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostList from "../../../components/posts/post-list/PostList";
import { AuthContext } from "../../../contexts/auth-context";
import { LoadingContext } from "../../../contexts/loading-context";
import PostModel from "../../../models/post-model";
import PostsService from "../../../services/posts/posts-service";

const HomePage = () => {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [isReady, setIsReady] = useState(false);
  const { auth } = useContext(AuthContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    setIsLoading(true);

    PostsService.getAllPosts()
      .then((dbPosts) => {
        setPosts(dbPosts);
      })
      .finally(() => {
        setIsReady(true);
        setIsLoading(false);
      });
  }, [setIsLoading]);

  if (!isReady || isLoading) {
    return null;
  }

  return (
    <div className="home-page">
      <PostList posts={posts}>
        <p>There are no posts yet.</p>
        {auth.status && (
          <Link to="/posts/new">Create the first post ever!</Link>
        )}
      </PostList>
    </div>
  );
};

export default HomePage;
