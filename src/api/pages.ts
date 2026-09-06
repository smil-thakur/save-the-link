import { pagesEndpoint, server_host } from "../constants/apis";
import { httpClient } from "../lib/httpClient";
import type { Page, UpdatePageInput } from "../models/page";

export const listPages = () => httpClient.get<Page[]>(pagesEndpoint);

export const createPage = (title: string, parentPageId?: string) =>
  httpClient.post<Page>(pagesEndpoint, { title, parentPageId });

export const getPage = (id: string) =>
  httpClient.get<Page>(`${pagesEndpoint}/${id}`);

export const updatePage = (id: string, updates: UpdatePageInput) =>
  httpClient.patch<Page>(`${pagesEndpoint}/${id}`, updates);

export const deletePage = (id: string) =>
  httpClient.delete(`${pagesEndpoint}/${id}`);

export const publishPage = (id: string, collaboration: "view" | "edit" | "invite") =>
  httpClient.post<Page>(`${pagesEndpoint}/${id}/publish`, { collaboration });

export interface SetCollaboratorsResult {
  page: Page;
  notFoundEmails?: string[];
}

export const setCollaborators = (id: string, emails: string[]) =>
  httpClient.patch<SetCollaboratorsResult>(`${pagesEndpoint}/${id}/collaborators`, {
    emails,
  });

export const unpublishPage = (id: string) =>
  httpClient.post<Page>(`${pagesEndpoint}/${id}/unpublish`);

export const getTrash = () => httpClient.get<Page[]>(`${server_host}/trash`);

export const restorePage = (id: string) =>
  httpClient.post<Page>(`${pagesEndpoint}/${id}/restore`);

export const permanentlyDeletePage = (id: string) =>
  httpClient.delete(`${pagesEndpoint}/${id}/permanent`);
