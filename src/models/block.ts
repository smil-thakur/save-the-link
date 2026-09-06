export type BlockFetchStatus = "ok" | "failed";

export interface Block {
  id: string;
  pageId: string;
  url: string;
  title: string;
  description: string;
  coverImage?: string;
  favicon?: string;
  siteName?: string;
  fetchStatus: BlockFetchStatus;
  tags: string[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateBlockInput {
  title?: string;
  description?: string;
  tags?: string[];
  order?: number;
}
