import React, { useContext, useEffect, useState } from "react";
import "./Post.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import LikesService from "../../services/likes-service";
import { AuthContext } from "../../helpers/auth-context";
import PostsService from "../../services/posts-service";

function Post({ post, large = false, canNavigate = true, onDelete }) {
  let navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(
      auth.status && post.likes.find((like) => like.user.id === auth.user.id),
    );
  }, [auth]);

  const handleLike = (e) => {
    e.stopPropagation();

    LikesService.like(post.id)
      .then((res) => {
        if (res.data.id) {
          setLikes([...likes, res.data]);
          setLiked(true);
        } else {
          setLikes(likes.filter((like) => like.user.id !== auth.user.id));
          setLiked(false);
        }
      })
      .catch((err) => err);
  };

  const handleDelete = (e) => {
    e.stopPropagation();

    let confirmation = window.confirm(
      "Are you sure you want to delete this post?",
    );

    if (confirmation) {
      PostsService.deletePost(post.id)
        .then(() => {
          onDelete && onDelete(post);
        })
        .catch((err) => err);
    }
  };

  const handleProfileClick = (e) => {
    e.stopPropagation();
    navigate(`/profile/${post.user.id}`);
  };

  return (
    <div
      className={`post ${large && "large"}`}
      onClick={() => canNavigate && navigate(`/posts/${post.id}`)}
    >
      <div className="title">
        <span>{post.title}</span>
        {auth.status && auth.user.id === post.user.id && (
          <div className="delete-post" onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrash} />
          </div>
        )}
      </div>

      <div className="body">
        <p>{post.postText}</p>
      </div>

      <div className="footer">
        <span onClick={handleProfileClick}>@{post.user.username}</span>
        <div
          className={"likes" + (liked ? " active" : "")}
          onClick={handleLike}
        >
          <FontAwesomeIcon icon={faThumbsUp} /> {likes.length}
        </div>
      </div>
    </div>
  );
}

export default Post;
