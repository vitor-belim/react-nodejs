import DbItem from "../api/db-item";

export default interface Page<T extends DbItem> {
  total: number;
  limit: number;
  page: number;
  pages: number;
  items: T[];
}
