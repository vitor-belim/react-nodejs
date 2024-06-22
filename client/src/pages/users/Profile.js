import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Post from "../../components/post/Post";
import "./Profile.css";
import Spinner from "../../components/spinner/Spinner";
import { AuthContext } from "../../helpers/auth-context";
import { LoadingContext } from "../../helpers/loading-context";
import UsersService from "../../services/users-service";

const Profile = () => {
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  let { auth } = useContext(AuthContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  let params = useParams();
  let navigate = useNavigate();

  const userId = +params.id;

  useEffect(() => {
    setIsLoading(true);

    UsersService.getUser(userId)
      .then((response) => {
        setUser(response.data);
        setIsLoadingPosts(true);

        UsersService.getPostsByUser(userId)
          .then((response) => {
            setPosts(response.data);
          })
          .finally(() => setIsLoadingPosts(false));
      })
      .catch(() => navigate("/"))
      .finally(() => setIsLoading(false));
  }, [userId, navigate]);

  const handlePostDelete = (deletedPost) => {
    setPosts(posts.filter((post) => post.id !== deletedPost.id));
  };

  if (!user || isLoading) return null;

  return (
    <div className="profile-container">
      <h1>Profile Page</h1>

      <div className="basic-info">
        <h2>Basic Info</h2>
        <p>
          <b>Id:</b> {user.id}
        </p>
        <p>
          <b>Username:</b> {user.username}
        </p>

        {auth.status && auth.user.id === userId && (
          <button
            className="action-btn"
            onClick={() => navigate("/change-password")}
          >
            <FontAwesomeIcon icon={faKey} /> Update Password
          </button>
        )}
      </div>

      <div className="posts-container">
        {auth.status && auth.user.id === userId ? (
          <h2>Your posts</h2>
        ) : (
          <h2>Posts by {user.username}</h2>
        )}
        {isLoadingPosts ? (
          <Spinner isLoading={true} height={200} />
        ) : (
          <>
            {posts.length === 0 && (
              <div className="no-posts">
                This user hasn't made any posts yet.
              </div>
            )}

            {posts.length > 0 && (
              <div className="posts">
                {posts.map((post) => (
                  <Post key={post.id} post={post} onDelete={handlePostDelete} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
