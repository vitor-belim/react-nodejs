import DbItem from "../api/db-item";
import Page from "./page";

class PageHelper {
  empty<T extends DbItem>(limit?: number): Page<T> {
    return {
      page: 0,
      limit: limit || 5,
      pages: 0,
      total: 0,
      items: [],
    };
  }

  paginate<T extends DbItem>(currentPage: Page<T>, newPage: Page<T>): Page<T> {
    return {
      ...newPage,
      items: [...currentPage.items, ...newPage.items],
    };
  }

  canPaginate<T extends DbItem>(page: Page<T>): boolean {
    return page.page < page.pages - 1;
  }

  removeItem<T extends DbItem>(page: Page<T>, item: T): Page<T> {
    return {
      ...page,
      items: page.items.filter((_item) => _item.id !== item.id),
    };
  }
}

const pageHelper = new PageHelper();
export default pageHelper;
