import { useQuery } from "@tanstack/react-query";
import * as publicApi from "../../api/publicPages";

export const usePublicPage = (slug: string | undefined) =>
  useQuery({
    queryKey: ["public-page", slug],
    queryFn: () => publicApi.getPublicPage(slug!).then((response) => response.data),
    enabled: slug !== undefined,
    retry: false,
  });

export const usePublicBlocks = (slug: string | undefined) =>
  useQuery({
    queryKey: ["public-blocks", slug],
    queryFn: () => publicApi.getPublicBlocks(slug!).then((response) => response.data),
    enabled: slug !== undefined,
  });

export const usePublicPagesList = () =>
  useQuery({
    queryKey: ["public-pages-list"],
    queryFn: () => publicApi.listPublicPages().then((response) => response.data),
  });
