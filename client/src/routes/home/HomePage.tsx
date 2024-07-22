import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import PostList from "../../components/posts/post-list/PostList";
import { AuthContext } from "../../contexts/auth-context";
import { LoadingContext } from "../../contexts/loading-context";
import PostModel from "../../models/db-objects/post-model";
import PageHelper from "../../models/pagination/page-helper";
import PostsService from "../../services/posts/posts-service";

const HomePage = () => {
  const [postsPage, setPostsPage] = useState(
    PageHelper.emptyPage<PostModel>(8),
  );
  const [isReady, setIsReady] = useState(false);
  const { auth } = useContext(AuthContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [isPaginating, setIsPaginating] = useState(false);

  const loadPosts = useCallback(
    async (page: number) => {
      if (page === 0) {
        setIsLoading(true);
      } else {
        setIsPaginating(true);
      }

      try {
        const { data: dbPostsPage } = await PostsService.getAllPosts({
          params: { page, limit: postsPage.limit },
        });
        if (page === 0) {
          setPostsPage(dbPostsPage);
        } else {
          setPostsPage((_postsPage) =>
            PageHelper.paginate(_postsPage, dbPostsPage),
          );
        }
      } catch (err) {
        window.alert(
          "Something failed while retrieving the posts. Make sure the server isn't down.",
        );
      } finally {
        setIsLoading(false);
        setIsPaginating(false);
      }
    },
    [setIsLoading, postsPage.limit],
  );

  useEffect(() => {
    loadPosts(0).finally(() => {
      setIsReady(true);
    });
  }, [loadPosts]);

  function handleOnPaginate() {
    loadPosts(postsPage.page + 1).then();
  }

  function handleOnDelete(deletedPost: PostModel) {
    setPostsPage(PageHelper.removeItem(postsPage, deletedPost));
  }

  return (
    <div className="home-page">
      <Header title="Home" withBackButton={false} />

      <PostList
        postsPage={postsPage}
        paginating={isPaginating}
        onPaginate={handleOnPaginate}
        onDelete={handleOnDelete}
      >
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
