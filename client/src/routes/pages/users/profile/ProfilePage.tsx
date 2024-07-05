import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostList from "../../../../components/posts/post-list/PostList";
import Spinner from "../../../../components/spinner/Spinner";
import { AuthContext } from "../../../../contexts/auth-context";
import { LoadingContext } from "../../../../contexts/loading-context";
import PostModel from "../../../../models/post-model";
import UserModel from "../../../../models/user-model";
import UsersService from "../../../../services/users/users-service";
import "./ProfilePage.scss";

const ProfilePage = () => {
  const [user, setUser] = useState<UserModel>();
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  let { auth } = useContext(AuthContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  let params = useParams();
  let navigate = useNavigate();

  const userId = parseInt(params.id || "");

  useEffect(() => {
    setIsLoading(true);

    UsersService.getUser(userId)
      .then((dbUser) => {
        setUser(dbUser);
        setIsLoadingPosts(true);

        UsersService.getPostsByUser(dbUser.id)
          .then((dbPosts) => {
            setPosts(dbPosts);
          })
          .finally(() => setIsLoadingPosts(false));
      })
      .catch(() => navigate("/"))
      .finally(() => setIsLoading(false));
  }, [userId, navigate, setIsLoading]);

  const handlePostDelete = (deletedPost: PostModel) => {
    setPosts(posts.filter((post) => post.id !== deletedPost.id));
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
          <PostList posts={posts} onDelete={handlePostDelete}>
            <p>This user hasn't made any posts yet.</p>
          </PostList>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
