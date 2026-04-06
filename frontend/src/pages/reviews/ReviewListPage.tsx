import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import type { Review } from "@/types/review";
import ReviewCard from "@/components/card/ReviewCard";
import AddButton from "@/components/button/AddButton";

function ReviewListPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // URL のクエリから page を取得。なければ 1 をデフォルトに
  const pageParam = new URLSearchParams(location.search).get("page");
  const page = pageParam ? parseInt(pageParam, 10) : 1;

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/reviews?page=${page}`, {
        credentials: "include"
      });

      if (res.ok) {
        const data = await res.json();
        setReviews(data.reviews);
      } else {
        alert("Get reviews failed");
      }
    } catch (e) {
      alert("Error occured");
      console.error(e);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [location.search]);

  const testReviews: Review[] = [
    {
      reviewId: 1,
      title: "スター・ウォーズ",
      posterPath: "/test.jpg",
      score: 4.5,
    },
    {
      reviewId: 2,
      title: "インセプション",
      posterPath: "/test.jpg",
      score: 4.8,
    },
    {
      reviewId: 3,
      title: "タイタニック",
      posterPath: "/test.jpg",
      score: 4.2,
    },
    {
      reviewId: 4,
      title: "ダークナイト",
      posterPath: "/test.jpg",
      score: 5.0,
    },
    {
      reviewId: 5,
      title: "アベンジャーズ",
      posterPath: "/test.jpg",
      score: 4.3,
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 text-center my-6">レビュー一覧</h1>
        <div className="grid grid-cols-4 gap-4">
          {testReviews.length === 0 ? (
            <p className="text-center text-gray-500">レビューがありません</p>
          ) : (
            testReviews.map((r, idx) => (
              <ReviewCard
                key={idx}
                review={r}
                onClick={() => navigate(`/reviews/${r.reviewId}`)}
              />
            ))
          )}
        </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => page > 1 && navigate(`/reviews?page=${page - 1}`)}
              className={page <= 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {[1, 2, 3].map((p) => (
            <PaginationItem key={p}>
              <PaginationLink
                onClick={() => navigate(`/reviews?page=${p}`, { replace: false })}
                isActive={p === page}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              onClick={() => navigate(`/reviews?page=${page + 1}`, { replace: false })}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <AddButton onClick={() => navigate("/reviews/edit")} />
    </div>
  );
}

export default ReviewListPage;