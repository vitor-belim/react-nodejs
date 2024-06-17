import React, { useContext, useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import "./CreatePost.css";
import * as Yup from "yup";
import PostsService from "../../../services/posts-service";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../helpers/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

function CreatePost() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const initialValues = {
    title: "",
    postText: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().max(40).required("The title is required"),
    postText: Yup.string().max(1000).required("The post's text is required"),
  });

  const onSubmit = (data) => {
    PostsService.createPost(data)
      .then((response) => {
        navigate(`/posts/${response.data.id}`);
      })
      .catch((err) => err);
  };

  useEffect(() => {
    if (auth.checked && !auth.status) {
      navigate("/login?from=" + window.location.pathname);
    }
  }, [auth]);

  return (
    <div className="create-post-page">
      <h2>Create a new post</h2>
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
            <FontAwesomeIcon icon={faSquarePlus} /> Create Post
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
