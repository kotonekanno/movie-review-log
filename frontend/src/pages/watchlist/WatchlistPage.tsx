import { useEffect, useState } from "react";

import type { WatchlistItem, FetchWatchlistResponse } from "@/types/watchlist";

import WatchlistCard from "@/components/card/WatchlistCard";
import AddButton from "@/components/button/AddButton";
import WatchlistEditDialog from "@/components/dialog/WatchlistEditDialog";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const fetchWatchlist = async () => {
    try {
      const res: Response = await fetch(`${API_BASE_URL}/watchlist`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.ok) {
        const data: FetchWatchlistResponse = await res.json();
        setWatchlist(data.watchlist);
      } else {
        console.error("Get watchlist failed");
      }
    } catch (e) {
      console.error("Get watchlist failed: " + e);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 text-center my-6">ウォッチリスト</h1>

      <div className="max-w-3xl mx-auto space-y-3">
        {watchlist.length === 0 ? (
          <p className="text-center text-gray-500">ウォッチリストがありません</p>
        ) : (
          watchlist.map((item, idx) => (
            <WatchlistCard
              key={idx}
              item={item}
            />
          ))
        )}
      </div>

      <AddButton
        onClick={() => setIsOpen(true)}
      />

      <WatchlistEditDialog
        buttonText="作成"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      />
    </div>
  )
}

export default WatchlistPage;