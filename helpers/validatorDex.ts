// Generated by ts-to-zod
import { z } from "zod";

export const articleListItemSchema = z.object({
  uid: z.string(),
  url: z.string(),
});

export const articleListResponseSchema = z.object({
  count: z.number(),
  entries: z.array(articleListItemSchema),
});

export const articleContentStackPublishDetailsSchema = z.object({
  environment: z.string(),
  locale: z.string(),
  time: z.string(),
  user: z.string(),
});

export const articleContentStackAclSchema = z.object({});

export const articleContentStackArticleSchema = z.object({
  _version: z.number(),
  locale: z.string(),
  uid: z.string(),
  ACL: articleContentStackAclSchema,
  _in_progress: z.boolean(),
  content: z.string(),
  created_at: z.string(),
  created_by: z.string(),
  tags: z.array(z.any()),
  title: z.string(),
  updated_at: z.string(),
  updated_by: z.string(),
  url: z.string(),
  publish_details: articleContentStackPublishDetailsSchema,
});