import type { Block } from "./block";
import type { Page } from "./page";

export interface SearchResults {
  pages: Page[];
  blocks: Block[];
}
