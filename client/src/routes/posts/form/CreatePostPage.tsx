import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../../../components/forms/post/PostForm";
import { AuthContext } from "../../../contexts/auth-context";
import PostModel from "../../../models/db-objects/post-model";
import PostsService from "../../../services/posts/posts-service";

function CreatePostPage() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.checked && !auth.status) {
      navigate("/login?from=" + window.location.pathname);
    }
  }, [auth, navigate]);

  const handleSubmit = (post: PostModel) => PostsService.createPost(post);

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
