import { faBroom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { KeyboardEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import PostList from "../../../components/posts/post-list/PostList";
import Tag from "../../../components/tag/Tag";
import { LoadingContext } from "../../../contexts/loading-context";
import PostModel from "../../../models/post-model";
import TagModel from "../../../models/tag-model";
import PostsService from "../../../services/posts/posts-service";
import "./SearchPage.css";

const SearchPage = () => {
  const [searchOptions, setSearchOptions] = useState<Record<string, string>>(
    {},
  );
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [isReady, setIsReady] = useState(false);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  let params = useParams();
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = params.query;
  let timeout: number | undefined = undefined;

  useEffect(() => {
    setIsLoading(true);

    const searchOptionsObj: Record<string, string> = {};
    if (query) {
      searchOptionsObj.query = query;
    }
    let tag = searchParams.get("tag");
    if (tag) {
      searchOptionsObj.tag = tag;
    }
    setSearchOptions(searchOptionsObj);

    PostsService.getAllPosts(searchOptionsObj)
      .then((dbPosts) => {
        setPosts(dbPosts);
      })
      .finally(() => {
        setIsReady(true);
        setIsLoading(false);
      });
  }, [query, searchParams, setIsLoading]);

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

  if (!isReady || isLoading) {
    return null;
  }

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

      <PostList posts={posts}>
        <button onClick={() => navigate("/search")}>
          <FontAwesomeIcon icon={faBroom} /> Clear filters
        </button>
      </PostList>
    </div>
  );
};

export default SearchPage;
