export type PageLayout = "grid" | "freeform";
export type PageVisibility = "private" | "public";
export type PageCollaboration = "none" | "view" | "edit";

export interface Page {
  id: string;
  parentPageId?: string;
  title: string;
  icon?: string;
  layout: PageLayout;
  visibility: PageVisibility;
  collaboration: PageCollaboration;
  slug?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface UpdatePageInput {
  title?: string;
  icon?: string;
  parentPageId?: string;
  order?: number;
}
