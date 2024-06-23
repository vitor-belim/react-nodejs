import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Spinner from "../../../components/spinner/Spinner";

const PostForm = ({ title, submitText, submitIcon, onSubmit, post = null }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    title: post?.title || "",
    postText: post?.postText || "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().max(40).required("The title is required"),
    postText: Yup.string().max(1000).required("The post's text is required"),
  });

  const handleSubmit = (data) => {
    setIsLoading(true);

    onSubmit(data)
      .then((response) => {
        navigate(`/posts/${response.data.id}`);
      })
      .catch((err) => err)
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="form-page">
      <h2>{title}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
            <FontAwesomeIcon icon={submitIcon} /> {submitText}
          </button>

          <Spinner isLoading={isLoading} />
        </Form>
      </Formik>
    </div>
  );
};

export default PostForm;
