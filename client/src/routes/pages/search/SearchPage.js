import { faBroom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import "./SearchPage.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import PostList from "../../../components/posts/post-list/PostList";
import Tag from "../../../components/tag/Tag";
import { LoadingContext } from "../../../contexts/loading-context";
import PostsService from "../../../services/posts/posts-service";

const SearchPage = () => {
  const [searchOptions, setSearchOptions] = useState({});
  const [posts, setPosts] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  let { query } = useParams();
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  let timeout = null;

  useEffect(() => {
    setIsLoading(true);

    const searchOptionsObj = {};
    if (query) {
      searchOptionsObj.query = query;
    }
    let tag = searchParams.get("tag");
    if (tag) {
      searchOptionsObj.tag = tag;
    }

    setSearchOptions(searchOptionsObj);

    PostsService.getAllPosts(searchOptionsObj)
      .then(({ data: posts }) => {
        setPosts(posts);
      })
      .finally(() => {
        setIsReady(true);
        setIsLoading(false);
      });
  }, [query, searchParams]);

  const handleSearch = (e) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      navigate({
        pathname: `/search/${e.target.value}`,
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

        {searchOptions.tag && (
          <Tag
            tag={{ name: searchOptions.tag }}
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
