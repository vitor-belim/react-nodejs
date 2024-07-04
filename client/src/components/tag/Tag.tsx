import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { MouseEvent } from "react";
import TagModel from "../../models/tag-model";
import "./Tag.css";

interface TagProps {
  tag: TagModel;
  canRemove?: boolean;
  onRemove?: (e: MouseEvent<SVGElement>, tag: TagModel) => void;
  key?: string | number;
}

const Tag = ({ tag, canRemove = false, onRemove = undefined }: TagProps) => {
  const handleOnClick = (e: MouseEvent<SVGElement>) => {
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
