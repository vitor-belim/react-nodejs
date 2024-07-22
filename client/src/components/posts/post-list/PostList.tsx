import React, { ReactNode } from "react";
import PostModel from "../../../models/db-objects/post-model";
import Page from "../../../models/pagination/page";
import PageHelper from "../../../models/pagination/page-helper";
import Spinner from "../../spinner/Spinner";
import Post from "../post/Post";
import "./PostList.scss";

interface PostListProps {
  postsPage: Page<PostModel>;
  onPaginate?: () => void;
  paginating?: boolean;
  onDelete?: (post: PostModel) => void;
  children?: ReactNode;
}

function PostList({
  postsPage,
  onPaginate = undefined,
  onDelete = undefined,
  paginating = true,
  children = <p>No posts were found.</p>,
}: PostListProps) {
  return (
    <div className="post-list-container">
      {postsPage.items.length === 0 && (
        <div className="no-posts">{children}</div>
      )}

      {postsPage.items.length > 0 && (
        <div className="posts">
          {postsPage.items.map((post) => (
            <Post
              key={post.id}
              post={post}
              onDelete={(post) => onDelete && onDelete(post)}
            ></Post>
          ))}

          {onPaginate && PageHelper.canPaginate(postsPage) && (
            <div className="paginate-button-container">
              {paginating ? (
                <Spinner isLoading={true} />
              ) : (
                <button
                  className="paginate-button secondary"
                  onClick={() => onPaginate()}
                >
                  Load More
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PostList;
