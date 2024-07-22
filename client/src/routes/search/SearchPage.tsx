import { faBroom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  KeyboardEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/header/Header";
import PostList from "../../components/posts/post-list/PostList";
import Spinner from "../../components/spinner/Spinner";
import Tag from "../../components/tag/Tag";
import { LoadingContext } from "../../contexts/loading-context";
import useMultiItemSearch from "../../hooks/multi-item-search-hook";
import PostModel from "../../models/db-objects/post-model";
import TagModel from "../../models/db-objects/tag-model";
import SpinnerSize from "../../models/enums/spinner-size";
import PageHelper from "../../models/pagination/page-helper";
import PostsService from "../../services/posts/posts-service";
import "./SearchPage.scss";

interface SearchRequestParams {
  page?: number;
  limit?: number;
  query?: string;
  tags?: string | string[];
}

const SearchPage = () => {
  const [postsPage, setPostsPage] = useState(PageHelper.emptyPage<PostModel>());
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPaginating, setIsPaginating] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number | undefined>();
  const [firstLoad, setFirstLoad] = useState(true);
  let [searchParams, setSearchParams] = useSearchParams();
  let { items: tags, removeItem: removeTag } = useMultiItemSearch("tags");

  let { isLoading: isLoadingPage, setIsLoading: setIsLoadingPage } =
    useContext(LoadingContext);

  const setupRequestParams = useCallback(
    (page: number) => {
      const params: SearchRequestParams = {
        page,
        limit: postsPage.limit,
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
    [searchParams, postsPage.limit],
  );

  const setLoaders = (state: boolean, page: number) => {
    if (firstLoad) {
      setIsLoadingPage(state);
    } else if (page === 0) {
      setIsLoading(state);
    } else {
      setIsPaginating(state);
    }
  };

  const loadPosts = useCallback(
    async (page: number) => {
      setLoaders(true, page);

      try {
        const { data: dbPostsPage } = await PostsService.getAllPosts({
          params: setupRequestParams(page),
        });
        if (page === 0) {
          setPostsPage(dbPostsPage);
        } else {
          setPostsPage((_postsPage) =>
            PageHelper.paginate(_postsPage, dbPostsPage),
          );
        }
      } catch (err) {
      } finally {
        setFirstLoad(false);
        setLoaders(false, page);
      }
    },
    [setupRequestParams, setIsLoadingPage, firstLoad],
  );

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  useEffect(() => {
    loadPosts(0).then();
  }, [loadPosts]);

  const handleOnPaginate = () => {
    loadPosts(postsPage.page + 1).then();
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

  function handleOnDelete(deletedPost: PostModel) {
    setPostsPage(PageHelper.removeItem(postsPage, deletedPost));
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

        <Spinner isLoading={isLoading} height={48} size={SpinnerSize.SMALL} />
      </div>

      <div className="results-container">
        <div className="posts-results">
          <PostList
            postsPage={postsPage}
            paginating={isPaginating}
            onPaginate={handleOnPaginate}
            onDelete={handleOnDelete}
          >
            {!isLoading && !isPaginating && !isLoadingPage && (
              <>
                <p>No posts were found.</p>
                <button onClick={handleClearFilters}>
                  <FontAwesomeIcon icon={faBroom} /> Clear filters
                </button>
              </>
            )}
          </PostList>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
