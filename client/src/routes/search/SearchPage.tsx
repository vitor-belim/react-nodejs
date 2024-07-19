import { faBroom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { KeyboardEvent, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/header/Header";
import PostList from "../../components/posts/post-list/PostList";
import Spinner from "../../components/spinner/Spinner";
import Tag from "../../components/tag/Tag";
import useMultiItemSearch from "../../hooks/multi-item-search-hook";
import PostModel from "../../models/db-objects/post-model";
import TagModel from "../../models/db-objects/tag-model";
import PageFactory from "../../models/pagination/page-factory";
import PostsService from "../../services/posts/posts-service";
import "./SearchPage.scss";

interface SearchRequestParams {
  page?: number;
  limit?: number;
  query?: string;
  tags?: string | string[];
}

const SearchPage = () => {
  const [postsPage, setPostsPage] = useState(PageFactory.default<PostModel>());
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [timeoutId, setTimeoutId] = useState<number | undefined>();
  let [searchParams, setSearchParams] = useSearchParams();
  let { items: tags, removeItem: removeTag } = useMultiItemSearch("tags");

  const setupRequestParams = useCallback(
    (page: number, limit: number) => {
      const params: SearchRequestParams = {
        page,
        limit,
      };

      const q = searchParams.get("q");
      if (q) {
        params.query = q;
      }

      const t = searchParams.getAll("tags");
      if (t) {
        params.tags = t;
      }

      return params;
    },
    [searchParams],
  );

  const loadPosts = useCallback(
    async (page: number, limit: number) => {
      setIsLoading(true);

      try {
        const { data: dbPostsPageI } = await PostsService.getAllPosts({
          params: setupRequestParams(page, limit),
        });
        setPostsPage(postsPage.paginate(dbPostsPageI));
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    },
    [setupRequestParams, postsPage],
  );

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  useEffect(() => {
    loadPosts(0, postsPage.limit).then();
  }, [loadPosts, postsPage]);

  const handleOnPaginate = () => {
    loadPosts(postsPage.page + 1, postsPage.limit).then();
  };

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setTimeoutId(
      window.setTimeout(() => {
        const target = e.target as HTMLInputElement;

        if (target.value) {
          searchParams.set("q", target.value);
        } else {
          searchParams.delete("q");
        }

        setSearchParams(searchParams);
        setTimeoutId(undefined);
      }, 600),
    );
  };

  function handleClearFilters() {
    for (const key of searchParams.keys()) {
      searchParams.delete(key);
    }
    setSearchParams(searchParams);
  }

  return (
    <div className="search-page">
      <Header title="Search" withBackButton={false} />

      <div className="search-container">
        <input
          type="text"
          placeholder="Search for something..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={handleSearch}
          autoFocus
        />

        {tags.length > 0 && (
          <div className="tags-container">
            {tags.map((tag, index) => (
              <Tag
                key={index}
                tag={{ name: tag } as TagModel}
                onRemove={() => removeTag(tag)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="results-container">
        <Spinner isLoading={isLoading} height={300} />

        <div className="posts-results" style={{ opacity: isLoading ? 0 : 1 }}>
          <PostList postsPage={postsPage} onPaginate={handleOnPaginate}>
            <p>No posts were found.</p>
            <button onClick={handleClearFilters}>
              <FontAwesomeIcon icon={faBroom} /> Clear filters
            </button>
          </PostList>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
