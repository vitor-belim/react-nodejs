import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage, Field, Form, Formik } from "formik";
import "./EditPost.css";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { AuthContext } from "../../../helpers/auth-context";
import PostsService from "../../../services/posts-service";

function EditPost() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [post, setPost] = useState();
  const { id } = useParams();

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
        } else {
          setPost(response.data);
        }
      })
      .catch(() => navigate("/"));
  }, [auth, id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const initialValues = {
    title: post.title,
    postText: post.postText,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().max(40).required("The title is required"),
    postText: Yup.string().max(1000).required("The post's text is required"),
  });

  const onSubmit = (data) => {
    PostsService.editPost(id, data)
      .then((response) => {
        navigate(`/posts/${response.data.id}`);
      })
      .catch((err) => err);
  };

  return (
    <div className="edit-post-page">
      <h2>Edit your post</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="form-container">
          <label>Title</label>
          <ErrorMessage name="title" component="span" />
          <Field
            id="title"
            className="input"
            name="title"
            placeholder="(Ex.: Title...)"
            autoComplete="off"
          />

          <label>Post</label>
          <ErrorMessage name="postText" component="span" />
          <Field
            as="textarea"
            id="post-text"
            className="input textarea"
            name="postText"
            placeholder="(Ex.: Lorem ipsum...)"
            autoComplete="off"
          />

          <button type="submit">
            <FontAwesomeIcon icon={faFloppyDisk} /> Save Post
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default EditPost;
