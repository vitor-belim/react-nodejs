import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostList from "../../components/posts/post-list/PostList";
import { AuthContext } from "../../contexts/auth-context";
import { LoadingContext } from "../../contexts/loading-context";
import PostModel from "../../models/db-objects/post-model";
import PageFactory from "../../models/pagination/page-factory";
import PostsService from "../../services/posts/posts-service";

const HomePage = () => {
  const [postsPage, setPostsPage] = useState(PageFactory.default<PostModel>(8));
  const [isReady, setIsReady] = useState(false);
  const { auth } = useContext(AuthContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  const loadPosts = useCallback(
    async (page: number, limit: number) => {
      setIsLoading(true);

      try {
        const { data: dbPostsPageI } = await PostsService.getAllPosts(null, {
          params: { page, limit },
        });
        setPostsPage(postsPage.paginate(dbPostsPageI));
      } catch (err) {
        window.alert(
          "Something failed while retrieving the posts. Make sure the server isn't down.",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, postsPage],
  );

  useEffect(() => {
    loadPosts(0, postsPage.limit).finally(() => {
      setIsReady(true);
    });
  }, [loadPosts, postsPage]);

  function handleOnPaginate() {
    loadPosts(postsPage.page + 1, postsPage.limit).then();
  }

  return (
    <div className="home-page">
      <PostList postsPage={postsPage} onPaginate={handleOnPaginate}>
        {isReady && !isLoading && (
          <>
            <p>There are no posts yet.</p>
            {auth.status && (
              <Link to="/posts/new">Create the first post ever!</Link>
            )}
          </>
        )}
      </PostList>
    </div>
  );
};

export default HomePage;
