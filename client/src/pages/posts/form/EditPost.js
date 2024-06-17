import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../helpers/auth-context";
import PostsService from "../../../services/posts-service";
import PostForm from "./PostForm";

function EditPost() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { id } = useParams();
  const [post, setPost] = useState();

  useEffect(() => {
    if (!auth.checked) {
      return;
    }

    if (!auth.status) {
      navigate("/login?from=" + window.location.pathname);
      return;
    }

    PostsService.getPost(id)
      .then((response) => {
        if (response.data.user.id !== auth.user.id) {
          navigate("/");
          return;
        }

        setPost(response.data);
      })
      .catch(() => navigate("/"));
  }, [auth, navigate, id]);

  if (!post) {
    return <div>Loading...</div>;
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
