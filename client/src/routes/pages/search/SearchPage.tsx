import { faBroom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { KeyboardEvent, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import PostList from "../../../components/posts/post-list/PostList";
import Spinner from "../../../components/spinner/Spinner";
import Tag from "../../../components/tag/Tag";
import PostModel from "../../../models/post-model";
import TagModel from "../../../models/tag-model";
import PostsService from "../../../services/posts/posts-service";
import "./SearchPage.scss";

const SearchPage = () => {
  const [searchOptions, setSearchOptions] = useState<Record<string, string>>(
    {},
  );
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
      .then((apiResponse) => {
        setPosts(apiResponse.data);
      })
      .catch((err) => err)
      .finally(() => {
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
          <PostList posts={posts}>
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
