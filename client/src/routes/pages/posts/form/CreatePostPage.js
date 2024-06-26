import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../contexts/auth-context";
import PostsService from "../../../../services/posts/posts-service";
import PostForm from "../../../components/forms/post/PostForm";

function CreatePostPage() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (auth.checked && !auth.status) {
      navigate("/login?from=" + window.location.pathname);
    }
  }, [auth, navigate]);

  const handleSubmit = (data) => PostsService.createPost(data);

  return (
    <PostForm
      title="Create a new post"
      submitText="Create Post"
      submitIcon={faSquarePlus}
      onSubmit={handleSubmit}
    />
  );
}

export default CreatePostPage;
