import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Tag.css";

const Tag = ({ tag, canRemove, onRemove }) => {
  const handleOnClick = (e) => {
    if (canRemove && onRemove) {
      onRemove(e, tag);
    }
  };

  return (
    <div className="tag-container">
      <span className="tag-text">{tag.name}</span>

      {canRemove && (
        <FontAwesomeIcon
          icon={faClose}
          className="tag-icon"
          onClick={handleOnClick}
        />
      )}
    </div>
  );
};

export default Tag;
