import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import TagModel from "../../models/db-objects/tag-model";
import "./Tag.scss";

interface TagProps {
  tag: TagModel;
  onRemove?: (tag: TagModel) => void;
  key?: string | number;
}

const Tag = ({ tag, onRemove = undefined }: TagProps) => {
  return (
    <div className="tag-container">
      <span className="tag-text">{tag.name}</span>

      {onRemove && (
        <FontAwesomeIcon
          icon={faClose}
          className="tag-icon"
          onClick={() => onRemove(tag)}
        />
      )}
    </div>
  );
};

export default Tag;
