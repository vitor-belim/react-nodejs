import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import "./CreatePost.css";
import * as Yup from "yup";
import PostsService from "../../../services/posts-service";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const navigate = useNavigate();

  const initialValues = {
    title: "",
    postText: "",
    username: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("The title is required"),
    postText: Yup.string().required("The post's text is required"),
    username: Yup.string()
      .min(3)
      .max(15)
      .required("The author's username is required"),
  });

  const onSubmit = (data) => {
    PostsService.createPost(data).then((response) => {
      console.log("Created a post!", response.data);
      navigate(`/posts/${response.data.id}`);
    });
  };

  return (
    <div className="create-post-page">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="form-container">
          <label>Title: </label>
          <ErrorMessage name="title" component="span" />
          <Field
            id="title"
            className="input"
            name="title"
            placeholder="(Ex.: Title...)"
            autoComplete="off"
          />

          <label>Post: </label>
          <ErrorMessage name="postText" component="span" />
          <Field
            id="post-text"
            className="input"
            name="postText"
            placeholder="(Ex.: Post...)"
            autoComplete="off"
          />

          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            id="username"
            className="input"
            name="username"
            placeholder="(Ex.: Jhon123...)"
            autoComplete="off"
          />

          <button type="submit">Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
