import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { MouseEvent } from "react";
import useMultiItemSearch from "../../hooks/multi-item-search-hook";
import TagModel from "../../models/db-objects/tag-model";
import "./Tag.scss";

interface TagProps {
  tag: TagModel;
  onRemove?: (tag: TagModel) => void;
  key?: string | number;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

const Tag = ({ tag, onRemove = undefined, onClick = undefined }: TagProps) => {
  let { items } = useMultiItemSearch("tags");
  const active = items.includes(tag.name);

  return (
    <div
      className={"tag-container" + (active ? " active" : "")}
      onClick={onClick}
    >
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
