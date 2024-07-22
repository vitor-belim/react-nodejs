import DbItem from "../api/db-item";
import Page from "./page";

class PageHelper {
  emptyPage<T extends DbItem>(limit?: number): Page<T> {
    return {
      page: 0,
      limit: limit || 5,
      pages: 0,
      total: 0,
      items: [],
    };
  }

  paginate<T extends DbItem>(
    currentItemPage: Page<T>,
    newItemPage: Page<T>,
  ): Page<T> {
    return {
      ...newItemPage,
      items: [...currentItemPage.items, ...newItemPage.items],
    };
  }

  canPaginate<T extends DbItem>(itemPage: Page<T>): boolean {
    return itemPage.page < itemPage.pages - 1;
  }

  removeItem<T extends DbItem>(itemPage: Page<T>, item: T): Page<T> {
    return {
      ...itemPage,
      items: itemPage.items.filter((_item) => _item.id !== item.id),
    };
  }
}

const pageHelper = new PageHelper();
export default pageHelper;
