interface ArticleListItem {
  uid: string;
  url: string;
}

interface ArticleListResponse {
  count: number;
  entries: ArticleListItem[];
}
declare module ArticleContentStack {
  export interface ACL {}

  export interface Metadata {
    uid: string;
  }

  export interface SideImage {
    image?: any;
    order?: any;
  }

  export interface RichTextEditor {
    rich_text_editor: string;
    _metadata: Metadata;
    side_image: SideImage;
  }

  export interface Metadata2 {
    uid: string;
  }

  export interface VideoYoutube {
    video_id: string;
    _metadata: Metadata2;
  }

  export interface Metadata3 {
    uid: string;
  }

  export interface Separator {
    type: string;
    custom_divider?: any;
    _metadata: Metadata3;
  }

  export interface Metadata4 {
    uid: string;
  }

  export interface AuthorBio {
    author_selection: string[];
    _metadata: Metadata4;
  }

  export interface ArticleBody {
    rich_text_editor: RichTextEditor;
    video_youtube: VideoYoutube;
    separator: Separator;
    author_bio: AuthorBio;
  }

  export interface ACL2 {}

  export interface PublishDetails {
    environment: string;
    locale: string;
    time: Date;
    user: string;
  }

  export interface Banner {
    _version: number;
    is_dir: boolean;
    uid: string;
    ACL: ACL2;
    content_type: string;
    created_at: Date;
    created_by: string;
    file_size: string;
    filename: string;
    parent_uid: string;
    tags: any[];
    title: string;
    updated_at: Date;
    updated_by: string;
    publish_details: PublishDetails;
    url: string;
  }

  export interface BannerSettings {
    portrait_banner?: any;
  }

  export interface Url {
    url: string;
    overridden: boolean;
    useLangSub: boolean;
  }

  export interface PublishDetails2 {
    environment: string;
    locale: string;
    time: Date;
    user: string;
  }

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
