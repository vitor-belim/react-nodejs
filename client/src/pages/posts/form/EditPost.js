import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../helpers/auth-context";
import { LoadingContext } from "../../../helpers/loading-context";
import PostsService from "../../../services/posts-service";
import PostForm from "./PostForm";

function EditPost() {
  const [post, setPost] = useState();
  const { auth } = useContext(AuthContext);
  const { setIsLoading } = useContext(LoadingContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.checked) {
      return;
    }

    if (!auth.status) {
      navigate("/login?from=" + window.location.pathname);
      return;
    }

    setIsLoading(true);

    PostsService.getPost(id)
      .then((response) => {
        if (response.data.user.id !== auth.user.id) {
          navigate("/");
          return;
        }

        setPost(response.data);
      })
      .catch(() => navigate("/"))
      .finally(() => setIsLoading(false));
  }, [auth, navigate, id]);

  if (!post) {
    return null;
  }

  const handleSubmit = (data) => PostsService.editPost(id, data);

  return (
    <PostForm
      post={post}
      title="Edit your post"
      submitText="Save Post"
      submitIcon={faFloppyDisk}
      onSubmit={handleSubmit}
    />
  );
}

export default EditPost;
