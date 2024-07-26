import {
  faArrowRightLong,
  faPencil,
  faThumbsUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { MouseEvent, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/auth-context";
import { LoadingContext } from "../../../contexts/loading-context";
import useMultiItemSearch from "../../../hooks/multi-item-search-hook";
import LikeModel from "../../../models/db-objects/like-model";
import PostModel from "../../../models/db-objects/post-model";
import LikesService from "../../../services/likes/likes-service";
import PostsService from "../../../services/posts/posts-service";
import Tag from "../../tag/Tag";
import "./Post.scss";

interface PostProps {
  post: PostModel;
  large?: boolean;
  canNavigate?: boolean;
  onDelete?: (post: PostModel) => void;
  key?: string | number;
}

function Post({
  post,
  large = false,
  canNavigate = true,
  onDelete = undefined,
}: PostProps) {
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(false);
  const { auth } = useContext(AuthContext);
  const { setIsLoading } = useContext(LoadingContext);
  let { addItem } = useMultiItemSearch("tags");

  useEffect(() => {
    setLiked(
      auth.status && post.likes.some((like) => like.user.id === auth.user?.id),
    );
  }, [auth, post.likes]);

  const handleLike = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    setLiked((liked) => {
      if (liked) {
        // remove like
        setLikes(likes.filter((like) => like.user.id !== auth.user?.id));
        return false;
      }

      // add like
      setLikes([...likes, { user: auth.user } as LikeModel]);
      return true;
    });

    LikesService.toggleLike(post.id).catch(() => {
      setLiked((liked) => !liked);
    });
  };

  const handleDelete = () => {
    const confirmation = window.confirm(
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

  return (
    <div className={`post-container ${large && "large"}`}>
      <div className="title">
        <span>{post.title}</span>
      </div>

      <div className="body">
        <span className="username">
          by <Link to={`/profile/${post.user.id}`}>{post.user.username}</Link>
        </span>

        <div className="post-text">
          <p className={post.tags.length > 0 ? "has-tags" : ""}>
            {post.postText}
          </p>
        </div>

        {post.tags.length > 0 && (
          <div className="tags">
            {post.tags.map((tag) => (
              <Tag tag={tag} key={tag.id} onClick={() => addItem(tag.name)} />
            ))}
          </div>
        )}
      </div>

      <div className="footer">
        <div className="actions">
          <div
            className={"action" + (liked ? " active" : "")}
            onClick={handleLike}
          >
            <span className="fa-layers fa-fw">
              <FontAwesomeIcon icon={faThumbsUp} />
              <span className="fa-layers-counter">{likes.length}</span>
            </span>
          </div>

          {auth.status && auth.user?.id === post.user.id && (
            <>
              <Link to={`/posts/${post.id}/edit`} className="action">
                <FontAwesomeIcon icon={faPencil} />
              </Link>

              <div className="action" onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrash} />
              </div>
            </>
          )}
        </div>

        {canNavigate && (
          <Link to={`/posts/${post.id}`} className="details">
            <FontAwesomeIcon icon={faArrowRightLong} />
          </Link>
        )}
      </div>
    </div>
  );
}

export default Post;
