interface RelatedListResponse {
  count: number;
  entries: ArticleContentStackPartialDex.Related[];
}

declare module ArticleContentStackPartialDex {
  export interface Related {
    _version: number;
    locale: string;
    uid: string;
    ACL: Acl;
    _in_progress: boolean;
    created_at: string;
    created_by: string;
    date: string;
    tags: string[];
    title: string;
    updated_at: string;
    updated_by: string;
    url: string;
    publish_details: PublishDetails;
  }

  export interface Acl {}

  export interface PublishDetails {
    environment: string;
    locale: string;
    time: string;
    user: string;
  }
}
