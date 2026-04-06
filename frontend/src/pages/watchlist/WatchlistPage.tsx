/*import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import type { WatchlistItem } from "@/types/watchlist";
import WatchlistCard from "@/components/card/WatchlistCard";
import AddButton from "@/components/button/AddButton";
import WatchlistCreateDialog from "@/components/dialog/WatchlistCreateDialog";

function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchWatchlist = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/watchlist`, {
        credentials: "include"
      });

      if (res.ok) {
        const data = await res.json();
        setWatchlist(data.results);
      } else {
        alert("Get watchlist failed");
      }
    } catch (e) {
      alert("Error occured");
      console.error(e);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, [location.search]);

  const testWatchlist: WatchlistItem[] = [
    {
      watchlistId: 1,
      jaTitle: "スター・ウォーズ",
      originalTitle: "Star Wars",
      posterPath: "/test.jpg",
      isWatched: true,
      priority: 87,
      note: "めっちゃ見たい",
    },
    {
      watchlistId: 2,
      jaTitle: "インセプション",
      originalTitle: "Star Wars",
      posterPath: "/test.jpg",
      priority: 66,
      isWatched: false,
      note: "めっちゃ見たい",
    },
    {
      watchlistId: 3,
      jaTitle: "タイタニック",
      originalTitle: "Star Wars",
      posterPath: "/test.jpg",
      priority: 78,
      isWatched: false,
      note: "めっちゃ見たい",
    },
    {
      watchlistId: 4,
      jaTitle: "ダークナイト",
      originalTitle: "Star Wars",
      posterPath: "/test.jpg",
      priority: 99,
      isWatched: false,
      note: "めっちゃ見たい",
    },
    {
      watchlistId: 5,
      jaTitle: "アベンジャーズ",
      originalTitle: "Star Wars",
      posterPath: "/test.jpg",
      priority: 43,
      isWatched: false,
      note: "めっちゃ見たい",
    },
  ];

  return (
    <div>
      <h1>ウォッチリスト</h1>

      <div className="max-w-3xl mx-auto space-y-3">
          {testWatchlist.length === 0 ? (
            <p>ウォッチリストがありません</p>
          ) : (
            testWatchlist.map((item, idx) => (
              <WatchlistCard
                key={idx}
                item={item}
              />
            ))
          )}
        </div>

        <AddButton
          onClick={() => {
            setIsOpen(true);
          }}
        />
    </div>
  )
}

export default WatchlistPage;*/

import { useEffect, useState } from "react";

import type { WatchlistFormValues, WatchlistItem } from "@/types/watchlist";
import WatchlistCard from "@/components/card/WatchlistCard";
import AddButton from "@/components/button/AddButton";
import WatchlistEditDialog from "@/components/dialog/WatchlistEditDialog";

function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchWatchlist = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/watchlist`, {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setWatchlist(data.watchlist);
      } else {
        alert("Get watchlist failed");
      }
    } catch (e) {
      alert("Error occured");
      console.error(e);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const testWatchlist: WatchlistItem[] = [
    {
      watchlistId: 1,
      jaTitle: "スター・ウォーズ",
      originalTitle: "Star Wars",
      posterPath: "/test.jpg",
      isWatched: true,
      priority: 87,
      note: "めっちゃ見たい",
    },
    {
      watchlistId: 2,
      jaTitle: "インセプション",
      originalTitle: "Star Wars",
      posterPath: "/test.jpg",
      priority: 66,
      isWatched: false,
      note: "めっちゃ見たい",
    },
    {
      watchlistId: 3,
      jaTitle: "タイタニック",
      originalTitle: "Star Wars",
      posterPath: "/test.jpg",
      priority: 78,
      isWatched: false,
      note: "めっちゃ見たい",
    },
    {
      watchlistId: 4,
      jaTitle: "ダークナイト",
      originalTitle: "Star Wars",
      posterPath: "/test.jpg",
      priority: 99,
      isWatched: false,
      note: "めっちゃ見たい",
    },
    {
      watchlistId: 5,
      jaTitle: "アベンジャーズ",
      originalTitle: "Star Wars",
      posterPath: "/test.jpg",
      priority: 43,
      isWatched: false,
      note: "めっちゃ見たい",
    },
  ];

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

      {/* 外部ボタンで開く */}
      <AddButton
        onClick={() => setIsOpen(true)}
      />

      {/* Dialog */}
      <WatchlistEditDialog
        buttonText="作成"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      />
    </div>
  )
}

export default WatchlistPage;