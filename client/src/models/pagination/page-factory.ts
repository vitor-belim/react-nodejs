import DbItem from "../api/db-item";
import Page from "./page";
import PageI from "./page-i";

export default class PageFactory {
  static fromInterface<T extends DbItem>(pageI: PageI<T>): Page<T> {
    return new Page(
      pageI.total,
      pageI.limit,
      pageI.page,
      pageI.pages,
      pageI.items,
    );
  }

  static default<T extends DbItem>(limit?: number): Page<T> {
    return new Page(0, limit || 5, 0, 0, [] as T[]);
  }
}
