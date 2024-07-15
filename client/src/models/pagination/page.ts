import DbItem from "../api/db-item";
import PageI from "./page-i";

export default class Page<T extends DbItem> {
  constructor(
    total: number,
    limit: number,
    page: number,
    pages: number,
    items: T[],
  ) {
    this._total = total;
    this._limit = limit;
    this._page = page;
    this._pages = pages;
    this._items = items;

    return this;
  }

  private _pages: number;

  get pages() {
    return this._pages;
  }

  private _total: number;

  get total() {
    return this._total;
  }

  private _limit: number;

  get limit() {
    return this._limit;
  }

  private _items: T[];

  get items() {
    return this._items;
  }

  private _page: number;

  get page() {
    return this._page;
  }

  prependItem(item: T) {
    this._items.unshift(item);
    return this;
  }

  deleteItem(item: T) {
    let index = this._items.findIndex((_item) => _item.id === item.id);
    this._items.splice(index, 1);

    return this;
  }

  canPaginate() {
    return this._page < this._pages - 1;
  }

  paginate(paginatedItemsI: PageI<T>) {
    this._page = paginatedItemsI.page;
    this._pages = paginatedItemsI.pages;
    this._total = paginatedItemsI.total;
    this._limit = paginatedItemsI.limit;

    if (paginatedItemsI.page === 0) {
      this._items = paginatedItemsI.items;
    } else {
      this._items.push(...paginatedItemsI.items);
    }

    return this;
  }
}
