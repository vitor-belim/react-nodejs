import { FieldArray, FieldArrayRenderProps } from "formik";
import React, { FocusEvent, KeyboardEvent } from "react";
import TagModel from "../../../models/db-objects/tag-model";
import Tag from "../../tag/Tag";
import "./TagsField.scss";

interface TagsFieldProps {
  name: string;
}

const TagsField = ({ name }: TagsFieldProps) => {
  const separatorKeys = ["Enter", "Tab", " "];

  const createTag = (
    target: HTMLInputElement,
    arrayHelpers: FieldArrayRenderProps,
  ) => {
    const tags: string[] = arrayHelpers.form.values[name];
    const textTrimmed = target.value.trim();

    if (!textTrimmed) {
      return;
    }

    if (tags.includes(textTrimmed)) {
      target.value = "";
      return;
    }

    arrayHelpers.push({ name: textTrimmed });

    target.value = "";
  };

  const handleOnBlur = (
    event: FocusEvent<HTMLInputElement>,
    arrayHelpers: FieldArrayRenderProps,
  ) => {
    event.stopPropagation();
    event.preventDefault();

    createTag(event.target, arrayHelpers);
  };

  const handleOnKeyUp = (
    event: KeyboardEvent<HTMLInputElement>,
    arrayHelpers: FieldArrayRenderProps,
  ) => {
    event.stopPropagation();

    const target = event.target as HTMLInputElement;
    const text = target.value;
    const tags: string[] = arrayHelpers.form.values[name];
    const pressedBackSpaceKey = event.key === "Backspace";

    if (pressedBackSpaceKey && !text && tags.length > 0) {
      // delete last tag
      arrayHelpers.pop();
      return;
    }

    if (text.trim() && separatorKeys.includes(event.key)) {
      createTag(target, arrayHelpers);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    if (target.value && separatorKeys.includes(event.key)) {
      event.preventDefault();
    }
  };

  const handleTagDelete = (
    index: number,
    arrayHelpers: FieldArrayRenderProps,
  ) => {
    arrayHelpers.remove(index);
  };

  const onRender = (arrayHelpers: FieldArrayRenderProps) => {
    return (
      <>
        <div className="tags-container">
          {arrayHelpers.form.values[name].map(
            (tag: TagModel, index: number) => (
              <Tag
                key={index}
                tag={tag}
                canRemove={true}
                onRemove={() => handleTagDelete(index, arrayHelpers)}
              />
            ),
          )}
        </div>

        <input
          type="text"
          onKeyDown={handleKeyDown}
          onBlur={(e) => handleOnBlur(e, arrayHelpers)}
          onKeyUp={(e) => handleOnKeyUp(e, arrayHelpers)}
          placeholder="(Ex.: Food, Travel, Technology...)"
        />
      </>
    );
  };

  return (
    <div className="tags-field-container">
      <FieldArray name={name} render={onRender} />
    </div>
  );
};

export default TagsField;
