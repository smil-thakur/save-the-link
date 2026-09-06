import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as blocksApi from "../../api/blocks";
import type { UpdateBlockInput } from "../../models/block";
import { useToast } from "../../context/toastContext";
import { getErrorMessage } from "../../lib/getErrorMessage";

export const blocksQueryKey = (pageId: string) => ["blocks", pageId] as const;

export const useBlocks = (pageId: string | undefined) =>
  useQuery({
    queryKey: blocksQueryKey(pageId ?? ""),
    queryFn: () => blocksApi.listBlocks(pageId!).then((response) => response.data),
    enabled: pageId !== undefined,
  });

export const useCreateBlock = (pageId: string) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: (url: string) =>
      blocksApi.createBlock(pageId, url).then((response) => response.data),
    onSuccess: (block) => {
      queryClient.invalidateQueries({ queryKey: blocksQueryKey(pageId) });
      if (block.fetchStatus === "failed") {
        showToast("Link saved, but we couldn't fetch a preview for it.", "info");
      } else {
        showToast("Link saved");
      }
    },
    onError: (error) =>
      showToast(getErrorMessage(error, "Couldn't save that link."), "error"),
  });
};

export const useUpdateBlock = (pageId: string) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: UpdateBlockInput }) =>
      blocksApi.updateBlock(id, updates).then((response) => response.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: blocksQueryKey(pageId) }),
    onError: (error) =>
      showToast(getErrorMessage(error, "Couldn't save that change."), "error"),
  });
};

export const useDeleteBlock = (pageId: string) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: (id: string) => blocksApi.deleteBlock(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blocksQueryKey(pageId) });
      showToast("Link removed");
    },
    onError: (error) =>
      showToast(getErrorMessage(error, "Couldn't remove that link."), "error"),
  });
};
