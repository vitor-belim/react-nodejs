import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import TagsField from "../../../../components/form/tags-field/TagsField";
import ToggleField from "../../../../components/form/toggle-field/ToggleField";
import Spinner from "../../../../components/spinner/Spinner";
import FormPage from "../form/FormPage";

const PostForm = ({ title, submitText, submitIcon, onSubmit, post = null }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  let initialValues = {
    title: "",
    postText: "",
    allowComments: true,
    tags: [],
  };
  if (post) {
    initialValues = {
      title: post.title,
      postText: post.postText,
      allowComments: post.allowComments,
      tags: post.tags,
    };
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().max(40).required("The title is required"),
    postText: Yup.string().max(1000).required("The post's text is required"),
    allowComments: Yup.boolean().required(),
    tags: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string()
            .max(10, "Tags must not be longer than 10 characters.")
            .required("The tag must not be empty"),
        }),
      )
      .max(3, "Only 3 tags are allowed")
      .optional(),
  });

  const handleSubmit = (data) => {
    console.log(data);
    setIsLoading(true);

    onSubmit(data)
      .then((response) => {
        navigate(`/posts/${response.data.id}`);
      })
      .catch((err) => err)
      .finally(() => setIsLoading(false));
  };

  return (
    <FormPage title={title}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="form-container">
          <label>Title</label>
          <ErrorMessage name="title" component="span" className="error" />
          <Field
            id="title"
            name="title"
            placeholder="(Ex.: Title...)"
            autoComplete="off"
          />

          <label>Post</label>
          <ErrorMessage name="postText" component="span" className="error" />
          <Field
            as="textarea"
            id="post-text"
            name="postText"
            placeholder="(Ex.: Lorem ipsum...)"
            autoComplete="off"
          />

          <label>Allow Comments</label>
          <ErrorMessage
            name="allowComments"
            component="span"
            className="error"
          />
          <ToggleField name="allowComments" />

          <label>Tags</label>
          <ErrorMessage
            name="tags"
            component="div"
            className="error"
            render={(msg) => {
              if (typeof msg !== "string") {
                const errorObj = msg.filter((err) => !!err)[0];
                const errorProp = Object.keys(errorObj)[0];
                msg = errorObj[errorProp];
              }

              return <span className="error">{msg}</span>;
            }}
          />
          <TagsField name="tags" />

          <button type="submit">
            <FontAwesomeIcon icon={submitIcon} /> {submitText}
          </button>

          <Spinner isLoading={isLoading} />
        </Form>
      </Formik>
    </FormPage>
  );
};

export default PostForm;
