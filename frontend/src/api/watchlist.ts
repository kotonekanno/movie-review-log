import type { FetchWatchlistResponse, WatchlistFormValues } from "@/types/watchlist";
import { apiClient } from "./client";
import { ApiError } from "@/errors/ApiError";

// ウォッチリスト取得
export async function getWatchlist(): Promise<FetchWatchlistResponse> {
  const res = await apiClient("/watchlist", {
    method: "GET",
  });

  if (res.status === 200) {
    return res.json();
  }

  const errorBody = await res.text(); // or json()

  throw new ApiError("GET /watchlist failed)");
}

// ウォッチリストアイテム追加
export async function createWatchlistItem(item: WatchlistFormValues): Promise<void> {
  const res = await apiClient("/watchlist", {
    method: "POST",
    body: JSON.stringify(item),
  });

  if (res.status === 201) {
    return;
  }

  throw new ApiError("POST /watchlist failed");
}

// ウォッチリストアイテム編集
export async function editWatchlistItem(watchlistId: number, patchData: Partial<WatchlistFormValues>): Promise<void> {
  const res = await apiClient(`/watchlist/${watchlistId}`, {
    method: "PATCH",
    body: JSON.stringify(patchData),
  });

  if (res.status === 204) {
    return;
  }

  throw new ApiError("PATCH /watchlist/watchlistId failed");
}

// ウォッチリストアイテムの視聴済みフラグ更新
export async function updateIsWatched(watchlistId: number, value: boolean): Promise<void> {
  const res = await apiClient("/watchlist", {
    method: "PATCH",
    body: JSON.stringify({
      watchlistId: watchlistId,
      isWatched: value,
    }),
  });

  if (res.status === 204) {
    return;
  }

  throw new ApiError("PATCH /watchlist failed");
}

// ウォッチリストアイテム削除（単体）
export async function deleteWatchlistItem(watchlistId: number): Promise<void> {
  const res = await apiClient(`/watchlist/${watchlistId}`, {
    method: "DELETE",
  });

  if (res.status === 204) {
    return;
  }

  throw new ApiError("DELETE /watchlist/watchlistItem failed");
}

// 視聴済みのウォッチリストアイテム一括削除
export async function bulkDeleteWatchlistItems(): Promise<void> {
  const res = await apiClient("/watchlist/bulk-delete", {
    method: "DELETE",
  });

  if (res.status === 204) {
    return;
  }

  throw new ApiError("DELETE /watchlist/bulk-delete failed");
}