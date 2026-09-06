export type PageLayout = "grid" | "freeform";
export type PageVisibility = "private" | "public";
// "edit" = anyone with the link can edit; "invite" = only the specific
// registered users in collaboratorEmails can edit.
export type PageCollaboration = "none" | "view" | "edit" | "invite";

export interface Page {
  id: string;
  parentPageId?: string;
  title: string;
  icon?: string;
  layout: PageLayout;
  visibility: PageVisibility;
  collaboration: PageCollaboration;
  slug?: string;
  collaboratorEmails?: string[];
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
