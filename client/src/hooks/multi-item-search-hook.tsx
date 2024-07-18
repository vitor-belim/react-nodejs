import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const useMultiItemSearch = (queryParam: string) => {
  const [items, setItems] = useState<string[]>([]);
  let [searchParams, setSearchParams] = useSearchParams();
  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    setItems(searchParams.getAll(queryParam));
  }, [searchParams, queryParam]);

  const updateRoute = (updatedItems: string[]) => {
    searchParams.delete(queryParam);
    for (const item of updatedItems) {
      searchParams.append(queryParam, item);
    }

    if (location.pathname === "/search") {
      setSearchParams(searchParams);
    } else {
      navigate({ pathname: "/search", search: searchParams.toString() });
    }
  };

  const addItem = (item: string) => {
    if (items.includes(item)) {
      return;
    }

    const updatedItems = [...items, item].sort();
    updateRoute(updatedItems);
  };

  const removeItem = (item: string) => {
    if (!items.includes(item)) {
      return;
    }

    const updatedItems = items.filter((t) => t !== item);
    updateRoute(updatedItems);
  };

  return {
    items,
    addItem,
    removeItem,
  };
};

export default useMultiItemSearch;
