import React, { useContext, useEffect, useState } from "react";
import "./Post.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import LikesService from "../../services/likes-service";
import { AuthContext } from "../../helpers/auth-context";

function Post({ post, large = false, canNavigate = true }) {
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

  return (
    <div
      className={`post ${large && "large"}`}
      onClick={() => canNavigate && navigate(`/posts/${post.id}`)}
    >
      <div className="title">
        <span>{post.title}</span>
      </div>
      <div className="body">
        <p>{post.postText}</p>
      </div>
      <div className="footer">
        @{post.user.username}
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
