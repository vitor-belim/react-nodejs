import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import TagsField from "../../../../components/form/tags-field/TagsField";
import ToggleField from "../../../../components/form/toggle-field/ToggleField";
import Spinner from "../../../../components/spinner/Spinner";
import ApiResponse from "../../../../models/api/api-response";
import PostModel from "../../../../models/db-objects/post-model";
import TagModel from "../../../../models/db-objects/tag-model";
import FormPage from "../form/FormPage";

interface PostFormProps {
  title: string;
  submitText: string;
  submitIcon: IconProp;
  onSubmit: (post: PostModel) => Promise<ApiResponse<PostModel>>;
  post?: PostModel;
}

interface PostFormValues {
  title: string;
  postText: string;
  allowComments: boolean;
  tags: TagModel[];
}

const PostForm = ({
  title,
  submitText,
  submitIcon,
  onSubmit,
  post = undefined,
}: PostFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  let initialValues: PostFormValues = {
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

  const handleSubmit = (data: PostFormValues) => {
    setIsLoading(true);

    onSubmit(data as PostModel)
      .then((apiResponse) => {
        navigate(`/posts/${apiResponse.data.id}`);
      })
      .catch((err) => err)
      .finally(() => setIsLoading(false));
  };

  const renderTagsErrorMessage = (
    msg: string | Record<string, string>[],
  ): ReactNode => {
    let errorMsg: string;

    if (Array.isArray(msg)) {
      const errorObj: Record<string, string> = msg.filter((err) => !!err)[0];
      const errorProp: string = Object.keys(errorObj)[0];
      errorMsg = errorObj[errorProp];
    } else {
      errorMsg = msg;
    }

    return <span className="error">{errorMsg}</span>;
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
            render={renderTagsErrorMessage}
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
