import {
  faPencil,
  faThumbsUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import "./Post.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/auth-context";
import { LoadingContext } from "../../../contexts/loading-context";
import LikesService from "../../../services/likes/likes-service";
import PostsService from "../../../services/posts/posts-service";

function Post({ post, large = false, canNavigate = true, onDelete }) {
  const { auth } = useContext(AuthContext);
  const { setIsLoading } = useContext(LoadingContext);
  let navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();

  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(
      auth.status && post.likes.find((like) => like.user.id === auth.user.id),
    );
  }, [auth, post.likes]);

  const handleLike = (e) => {
    e.stopPropagation();

    setLiked((liked) => {
      if (liked) {
        // remove like
        setLikes(likes.filter((like) => like.user.id !== auth.user.id));
        return false;
      }

      // add like
      setLikes([...likes, { user: auth.user }]);
      return true;
    });

    LikesService.like(post.id).catch(() => {
      setLiked((liked) => !liked);
    });
  };

  const handleDelete = (e) => {
    e.stopPropagation();

    let confirmation = window.confirm(
      "Are you sure you want to delete this post?",
    );

    if (confirmation) {
      setIsLoading(true);

      PostsService.deletePost(post.id)
        .then(() => {
          onDelete && onDelete(post);
        })
        .catch((err) => err)
        .finally(() => setIsLoading(false));
    }
  };

  const handleProfileClick = (e) => {
    e.stopPropagation();
    navigate(`/profile/${post.user.id}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/posts/${post.id}/edit`);
  };

  const handleTagClick = (e, tag) => {
    e.stopPropagation();

    if (window.location.pathname.startsWith("/search")) {
      setSearchParams({ ...searchParams, tag: tag.name });
    } else {
      navigate(`/search?tag=${tag.name}`);
    }
  };

  return (
    <div
      className={`post ${large && "large"}`}
      onClick={() => canNavigate && navigate(`/posts/${post.id}`)}
    >
      <div className="title">
        <span>{post.title}</span>
        {auth.status && auth.user.id === post.user.id && (
          <div className="actions">
            <div className="action" onClick={handleEdit}>
              <FontAwesomeIcon icon={faPencil} />
            </div>
            <div className="action" onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} />
            </div>
          </div>
        )}
      </div>

      <div className="body">
        <div className="post-text">
          <p>{post.postText}</p>
        </div>

        {post.tags.length > 0 && (
          <div className="tags">
            {post.tags.map((tag) => (
              <span
                onClick={(e) => handleTagClick(e, tag)}
                key={tag.id}
                className="tag"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}
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
