import { FieldArray } from "formik";
import React from "react";
import "./TagsField.css";
import Tag from "../../tag/Tag";

const TagsField = ({ name }) => {
  const separatorKeys = ["Enter", "Tab", " "];

  const createTag = (e, arrayHelpers) => {
    e.stopPropagation();
    e.preventDefault();

    const tags = arrayHelpers.form.values[name];
    const textTrimmed = e.target.value.trim();

    if (!textTrimmed) {
      return;
    }

    if (tags.includes(textTrimmed)) {
      e.target.value = "";
      return;
    }

    arrayHelpers.push({ name: textTrimmed });

    e.target.value = "";
  };

  const handleOnKeyUp = (e, arrayHelpers) => {
    e.stopPropagation();

    const text = e.target.value;
    const tags = arrayHelpers.form.values[name];
    const pressedBackSpaceKey = e.key === "Backspace";

    if (pressedBackSpaceKey && !text && tags.length > 0) {
      // delete last tag
      arrayHelpers.pop();
      return;
    }

    if (text.trim() && separatorKeys.includes(e.key)) {
      createTag(e, arrayHelpers);
    }
  };

  const handleKeyDown = (e) => {
    if (e.target.value && separatorKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleTagDelete = (e, index, arrayHelpers) => {
    arrayHelpers.remove(index);
  };

  return (
    <div className="tags-field-container" style={{ width: "100%" }}>
      <FieldArray
        name={name}
        render={(arrayHelpers) => {
          return (
            <>
              <div className="tags-container">
                {arrayHelpers.form.values[name].map((tag, index) => (
                  <Tag
                    key={index}
                    tag={tag}
                    canRemove={true}
                    onRemove={(e) => handleTagDelete(e, index, arrayHelpers)}
                  />
                ))}
              </div>

              <input
                style={{ width: "100%" }}
                type="text"
                onKeyDown={handleKeyDown}
                onBlur={(e) => createTag(e, arrayHelpers)}
                onKeyUp={(e) => handleOnKeyUp(e, arrayHelpers)}
                placeholder="(Ex.: Food, Travel, Technology...)"
              />
            </>
          );
        }}
      />
    </div>
  );
};

export default TagsField;
