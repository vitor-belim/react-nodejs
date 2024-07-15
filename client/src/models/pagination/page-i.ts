import DbItem from "../api/db-item";

export default interface PageI<T extends DbItem> {
  total: number;
  limit: number;
  page: number;
  pages: number;
  items: T[];
}
