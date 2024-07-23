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

interface SearchLoaders {
  loadingPage: boolean;
  loadingPosts: boolean;
  paginatingPosts: boolean;
}

const SearchPage = () => {
  const [postsPage, setPostsPage] = useState(PageHelper.empty<PostModel>());
  const [loaders, setLoaders] = useState<SearchLoaders>({
    loadingPage: true,
    loadingPosts: false,
    paginatingPosts: false,
  });
  const [query, setQuery] = useState("");
  const [timeoutId, setTimeoutId] = useState<number | undefined>();
  let { setIsLoading } = useContext(LoadingContext);
  let [searchParams, setSearchParams] = useSearchParams();
  let { items: tags, removeItem: removeTag } = useMultiItemSearch("tags");

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
      if (t.length > 0) {
        params.tags = t;
      }

      return params;
    },
    [searchParams, postsPage.limit],
  );

  const loadPosts = useCallback(
    async (page: number) => {
      setLoaders((_loaders) => ({
        ..._loaders,
        loadingPosts: page === 0,
        paginatingPosts: page > 0,
      }));

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
        setLoaders({
          loadingPage: false,
          loadingPosts: false,
          paginatingPosts: false,
        });
      }
    },
    [setupRequestParams],
  );

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(loaders.loadingPage);
  }, [setIsLoading, loaders.loadingPage]);

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

  if (loaders.loadingPage) {
    return null;
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

        <Spinner
          isLoading={loaders.loadingPosts}
          height={48}
          size={SpinnerSize.SMALL}
        />
      </div>

      <div className="results-container">
        <div className="posts-results">
          <PostList
            postsPage={postsPage}
            paginating={loaders.paginatingPosts}
            onPaginate={handleOnPaginate}
            onDelete={handleOnDelete}
          >
            {!loaders.loadingPosts && !loaders.paginatingPosts && (
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
