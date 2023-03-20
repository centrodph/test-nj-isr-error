interface ArticleListItem {
  uid: string;
  url: string;
}

interface ArticleListResponse {
  count: number;
  entries: ArticleListItem[];
}

declare module ArticleContentStack {
  export interface PublishDetails {
    environment: string;
    locale: string;
    time: string;
    user: string;
  }

  export interface Acl {}

  export interface Article {
    _version: number;
    locale: string;
    uid: string;
    ACL: Acl;
    _in_progress: boolean;
    content: string;
    created_at: string;
    created_by: string;
    tags: any[];
    title: string;
    updated_at: string;
    updated_by: string;
    url: string;
    publish_details: PublishDetails;
  }
}
