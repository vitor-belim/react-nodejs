import { faBroom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { KeyboardEvent, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import PostList from "../../../components/posts/post-list/PostList";
import Spinner from "../../../components/spinner/Spinner";
import Tag from "../../../components/tag/Tag";
import PostModel from "../../../models/db-objects/post-model";
import TagModel from "../../../models/db-objects/tag-model";
import PageFactory from "../../../models/pagination/page-factory";
import PostsService from "../../../services/posts/posts-service";
import "./SearchPage.scss";

const SearchPage = () => {
  const [searchOptions, setSearchOptions] = useState<Record<string, string>>(
    {},
  );
  const [postsPage, setPostsPage] = useState(PageFactory.default<PostModel>());
  const [isLoading, setIsLoading] = useState(true);
  let params = useParams();
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = params.query;
  let timeout: number | undefined = undefined;

  const setupSearchOptions = useCallback(() => {
    const searchOptionsObj: Record<string, string> = {};

    if (query) {
      searchOptionsObj.query = query;
    }
    let tag = searchParams.get("tag");
    if (tag) {
      searchOptionsObj.tag = tag;
    }

    setSearchOptions(searchOptionsObj);

    return searchOptionsObj;
  }, [query, searchParams]);

  const loadPosts = useCallback(
    async (page: number, limit: number) => {
      setIsLoading(true);

      try {
        const { data: dbPostsPageI } = await PostsService.getAllPosts(
          setupSearchOptions(),
          {
            params: { page, limit },
          },
        );
        setPostsPage(postsPage.paginate(dbPostsPageI));
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    },
    [setupSearchOptions, postsPage],
  );

  useEffect(() => {
    loadPosts(0, postsPage.limit).then();
  }, [loadPosts, postsPage]);

  const handleOnPaginate = () => {
    loadPosts(postsPage.page + 1, postsPage.limit).then();
  };

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = window.setTimeout(() => {
      const target = e.target as HTMLInputElement;

      navigate({
        pathname: `/search/${target.value}`,
        search: searchParams.toString(),
      });
    }, 600);
  };

  return (
    <div className="search-page">
      <h1>Search</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search for something..."
          defaultValue={query}
          onKeyUp={handleSearch}
          autoFocus
        />

        {searchOptions?.tag && (
          <Tag
            tag={{ name: searchOptions.tag } as TagModel}
            canRemove={true}
            onRemove={() => setSearchParams({})}
          />
        )}
      </div>

      <div className="results-container">
        <Spinner isLoading={isLoading} height={300} />

        <div className="posts-results" style={{ opacity: isLoading ? 0 : 1 }}>
          <PostList postsPage={postsPage} onPaginate={handleOnPaginate}>
            <p>No posts were found.</p>
            <button onClick={() => navigate("/search")}>
              <FontAwesomeIcon icon={faBroom} /> Clear filters
            </button>
          </PostList>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
