import { useEffect, useState } from "react";

import type { WatchlistItem, FetchWatchlistResponse } from "@/types/watchlist";

import WatchlistCard from "@/components/card/WatchlistCard";
import AddButton from "@/components/button/AddButton";
import WatchlistEditDialog from "@/components/dialog/WatchlistEditDialog";
import ConfirmDialog from "@/components/dialog/ConfirmDialog";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [watched, setWatched] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);

  const fetchWatchlist = async () => {
    try {
      const res: Response = await fetch(`${API_BASE_URL}/watchlist`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (res.ok) {
        const data: FetchWatchlistResponse = await res.json();
        setWatchlist(data.watchlist);
        setWatched(data.watched);
      }

      return;
    } catch (e) {
      return;
    }
  };

  const handleDeleteAll = async () => {
    try {
      const res: Response = await fetch(`${API_BASE_URL}/watchlist/bulk-delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (res.status === 204) {
        await fetchWatchlist();
      }

      return;
    } catch (e) {
      return;
    }
  }

  useEffect(() => {
    fetchWatchlist();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 text-center my-6">ウォッチリスト</h1>

      <div className="max-w-3xl mx-auto px-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
          </span>

          <ConfirmDialog
            title={`視聴済みの作品 ${watched} 件を削除しますか？`}
            text="この操作は取り消せません。削除すると完全に消去されます。"
            buttonText="視聴済み削除"
            leftOnClick={handleDeleteAll}
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {watchlist.length === 0 ? (
          <p className="text-center text-gray-500">ウォッチリストがありません</p>
        ) : (
          watchlist.map((item) => (
            <WatchlistCard
              key={item.watchlistId}
              item={item}
              onSuccess={fetchWatchlist}
            />
          ))
        )}
      </div>

      <AddButton
        onClick={() => setIsOpen(true)}
      />

      <WatchlistEditDialog
        mode="create"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        onSuccess={fetchWatchlist}
      />
    </div>
  )
}

export default WatchlistPage;