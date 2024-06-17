import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UsersService from "../../services/users-service";
import Post from "../../components/post/Post";
import "./Profile.css";
import { AuthContext } from "../../helpers/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  let params = useParams();
  let navigate = useNavigate();
  let { auth } = useContext(AuthContext);
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);

  const userId = +params.id;

  useEffect(() => {
    UsersService.getUser(userId)
      .then((response) => {
        setUser(response.data);

        UsersService.getPostsByUser(userId).then((response) => {
          setPosts(response.data);
        });
      })
      .catch(() => navigate("/"));
  }, [userId]);

  const handlePostDelete = (deletedPost) => {
    setPosts(posts.filter((post) => post.id !== deletedPost.id));
  };

  if (!user) return <div>Loading...</div>;

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

        {posts.length === 0 && (
          <div className="no-posts">This user hasn't made any posts yet.</div>
        )}

        {posts.length > 0 && (
          <div className="posts">
            {posts.map((post) => (
              <Post key={post.id} post={post} onDelete={handlePostDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
