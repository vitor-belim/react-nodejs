import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostList from "../../../components/posts/post-list/PostList";
import Spinner from "../../../components/spinner/Spinner";
import { AuthContext } from "../../../contexts/auth-context";
import { LoadingContext } from "../../../contexts/loading-context";
import PostModel from "../../../models/db-objects/post-model";
import UserModel from "../../../models/db-objects/user-model";
import PageFactory from "../../../models/pagination/page-factory";
import PostsService from "../../../services/posts/posts-service";
import UsersService from "../../../services/users/users-service";
import "./ProfilePage.scss";

const ProfilePage = () => {
  const [user, setUser] = useState<UserModel>();
  const [postsPage, setPostsPage] = useState(PageFactory.default<PostModel>());
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  let { auth } = useContext(AuthContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  let params = useParams();
  let navigate = useNavigate();

  const userId = parseInt(params.id || "");

  const loadPosts = useCallback(
    async (userId: number, page: number, limit: number) => {
      setIsLoadingPosts(true);

      try {
        const { data: dbPostsPageI } = await PostsService.getPostsByUser(
          userId,
          { params: { page, limit } },
        );

        setPostsPage(postsPage.paginate(dbPostsPageI));
      } finally {
        setIsLoadingPosts(false);
      }
    },
    [postsPage],
  );

  const loadUser = useCallback(async () => {
    setIsLoading(true);

    try {
      const { data: dbUser } = await UsersService.getUser(userId);

      setUser(dbUser);
    } catch {
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, userId, navigate]);

  useEffect(() => {
    loadUser().then(() => {
      loadPosts(userId, 0, postsPage.limit).then();
    });
  }, [loadUser, loadPosts, userId, postsPage]);

  const handlePostDelete = (deletedPost: PostModel) => {
    setPostsPage(postsPage.deleteItem(deletedPost));
  };

  const handleOnPaginate = () => {
    loadPosts(userId, postsPage.page + 1, postsPage.limit).then();
  };

  if (!user || isLoading) {
    return null;
  }

  return (
    <div className="profile-page">
      <h1>Profile Page</h1>

      <div className="basic-info">
        <h2>Basic Info</h2>
        <p>
          <b>Id:</b> {user.id}
        </p>
        <p>
          <b>Username:</b> {user.username}
        </p>

        {auth.status && auth.user?.id === userId && (
          <button
            className="action-btn"
            onClick={() => navigate("/change-password")}
          >
            <FontAwesomeIcon icon={faKey} /> Update Password
          </button>
        )}
      </div>

      <div className="posts-container">
        {auth.status && auth.user?.id === userId ? (
          <h2>Your posts</h2>
        ) : (
          <h2>Posts by {user.username}</h2>
        )}

        {isLoadingPosts ? (
          <Spinner isLoading={true} height={200} />
        ) : (
          <PostList
            postsPage={postsPage}
            onDelete={handlePostDelete}
            onPaginate={handleOnPaginate}
          >
            <p>This user hasn't made any posts yet.</p>
          </PostList>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
