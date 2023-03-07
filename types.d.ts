interface ArticleListItem {
  uid: string;
  url: string;
}

interface ArticleListResponse {
  count: number;
  entries: ArticleListItem[];
}
declare module ArticleContentStack {
  export interface Article {
    _version: number;
    locale: string;
    uid: string;
    ACL: ACL;
    _in_progress: boolean;
    content: string;
    title: string;
  }
}
