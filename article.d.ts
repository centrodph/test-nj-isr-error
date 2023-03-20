declare module ArticleContentStackReal {
  export interface Article {
    _version: number;
    locale: string;
    uid: string;
    ACL: Acl;
    _in_progress: boolean;
    article_body: ArticleBody[];
    article_tags: string[];
    article_type: string;
    audience_targeting: PlaceHolder[];
    audience_targeting_boost: PlaceHolder[];
    author: string[];
    banner: Banner;
    banner_settings: BannerSettings;
    category: string[];
    channels_config: ChannelsConfig[];
    content_targeting_parameters: PlaceHolder[];
    created_at: string;
    created_by: string;
    date: string;
    description: string;
    external_link: string;
    hide_from_lol_com: boolean;
    patch_notes_body: PlaceHolder[];
    promo_card_size: string;
    send_mobile_push_notification: boolean;
    send_to_mobile: boolean;
    tags: PlaceHolder[];
    title: string;
    updated_at: string;
    updated_by: string;
    url: Url;
    youtube_link: string;
    publish_details: PublishDetails2;
  }

  export interface PlaceHolder {}

  export interface Acl {}

  export interface ArticleBody {
    rich_text_editor?: RichTextEditor;
    separator?: Separator;
    author_bio?: AuthorBio;
  }

  export interface RichTextEditor {
    rich_text_editor: string;
    _metadata: Metadata;
    side_image: SideImage;
  }

  export interface Metadata {
    uid: string;
  }

  export interface SideImage {
    image: PlaceHolder;
    order: PlaceHolder;
  }

  export interface Separator {
    type: string;
    custom_divider: PlaceHolder;
    _metadata: Metadata2;
  }

  export interface Metadata2 {
    uid: string;
  }

  export interface AuthorBio {
    author_selection: string[];
    _metadata: Metadata3;
  }

  export interface Metadata3 {
    uid: string;
  }

  export interface Banner {
    _version: number;
    is_dir: boolean;
    uid: string;
    ACL: Acl2;
    content_type: string;
    created_at: string;
    created_by: string;
    file_size: string;
    filename: string;
    parent_uid: string;
    tags: PlaceHolder[];
    title: string;
    updated_at: string;
    updated_by: string;
    publish_details: PublishDetails;
    url: string;
  }

  export interface Acl2 {}

  export interface PublishDetails {
    environment: string;
    locale: string;
    time: string;
    user: string;
  }

  export interface BannerSettings {
    portrait_banner: PlaceHolder;
  }

  export interface ChannelsConfig {
    t2: T2;
  }

  export interface T2 {
    title: string;
    _metadata: Metadata4;
    image: PlaceHolder;
  }

  export interface Metadata4 {
    uid: string;
  }

  export interface Url {
    url: string;
    overridden: boolean;
    useLangSub: boolean;
  }

  export interface PublishDetails2 {
    environment: string;
    locale: string;
    time: string;
    user: string;
  }
}
