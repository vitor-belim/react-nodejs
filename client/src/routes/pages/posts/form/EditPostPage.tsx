import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../../contexts/auth-context";
import { LoadingContext } from "../../../../contexts/loading-context";
import PostModel from "../../../../models/db-objects/post-model";
import PostsService from "../../../../services/posts/posts-service";
import PostForm from "../../../components/forms/post/PostForm";

function EditPostPage() {
  const [post, setPost] = useState<PostModel>();
  const { auth } = useContext(AuthContext);
  const { setIsLoading } = useContext(LoadingContext);
  const params = useParams();
  const navigate = useNavigate();

  const id = parseInt(params.id || "");

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
      .then((apiResponse) => {
        if (!auth.user || apiResponse.data.user.id !== auth.user.id) {
          navigate("/");
          return;
        }

        setPost(apiResponse.data);
      })
      .catch(() => navigate("/"))
      .finally(() => setIsLoading(false));
  }, [auth, navigate, id, setIsLoading]);

  if (!post) {
    return null;
  }

  const handleSubmit = (post: PostModel) => PostsService.editPost(id, post);

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

export default EditPostPage;
