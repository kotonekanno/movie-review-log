import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import type { Review, ReviewListResponse } from "@/types/review";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";

import ReviewCard from "@/components/card/ReviewCard";
import AddButton from "@/components/button/AddButton";
import { toast } from "sonner";

type SortKey = "jaTitle" | "releaseYear" | "createdAt" | "updatedAt" | "score" | "watchedAt";
type Order = "ASC" | "DESC";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ReviewListPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [order, setOrder] = useState<Order>("DESC");
  const [totalPages, setTotalPages] = useState<number>(1);

  const pageParam = new URLSearchParams(location.search).get("page");
  const page = pageParam ? parseInt(pageParam, 10) : 1;
  
  const visiblePages = 3;
  let startPage = Math.max(page - Math.floor(visiblePages / 2), 1);
  let endPage = startPage + visiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - visiblePages + 1, 1);
  }

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const fetchReviews = async (page: number, sortKey: SortKey, order: Order) => {
    try {
      const res: Response = await fetch(`${API_BASE_URL}/reviews?page=${page}&sort=${sortKey}&order=${order}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      });

      if (res.status === 200) {
        const data: ReviewListResponse = await res.json();
        setReviews(data.reviews);
        setTotalPages(data.totalPages);
      } else {
        toast.error("レビュー一覧の取得に失敗しました");
      }
    } catch (e) {
      toast.error("レビュー一覧の取得に失敗しました");
    }
  };

  const toggleOrder = () => {
    setOrder((prev) => (prev === "ASC" ? "DESC" : "ASC"));
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get("page") || "1", 10);
    const sort = (params.get("sort") as SortKey) || "createdAt";
    const order = (params.get("order") as Order) || "DESC";

    fetchReviews(page, sort, order);
  }, [location.search]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 text-center my-6">レビュー一覧</h1>

      <div className="flex items-center gap-2 justify-end mx-auto">
        <Select value={sortKey} onValueChange={(value: SortKey) => setSortKey(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt">作成日時</SelectItem>
            <SelectItem value="updatedAt">更新日時</SelectItem>
            <SelectItem value="score">点数</SelectItem>
            <SelectItem value="watchedAt">視聴日</SelectItem>
            <SelectItem value="jaTitle">タイトル</SelectItem>
            <SelectItem value="releaseYear">公開年</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="icon" onClick={toggleOrder}>
          {order === "DESC"
            ? <ArrowDown className="h-4 w-4" />
            : <ArrowUp className="h-4 w-4" />
          }
        </Button>

        <Button onClick={() => navigate(`/reviews?page=1&sort=${sortKey}&order=${order}`)}>
          並べ替え
        </Button>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => page > 1 && navigate(`/reviews?page=${page - 1}&sort=${sortKey}&order=${order}`)}
              className={page <= 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {startPage > 1 && (
            <>
              <PaginationItem>
                <PaginationLink onClick={() => navigate(`/reviews?page=1&sort=${sortKey}&order=${order}`)}>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </>
          )}

          {pageNumbers.map(p => (
            <PaginationItem key={p}>
              <PaginationLink onClick={() => navigate(`/reviews?page=${p}&sort=${sortKey}&order=${order}`)} isActive={p === page}>
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}

          {endPage < totalPages && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink onClick={() => navigate(`/reviews?page=${totalPages}&sort=${sortKey}&order=${order}`)}>
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => page < totalPages && navigate(`/reviews?page=${page + 1}&sort=${sortKey}&order=${order}`)}
              className={page >= totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <div className="grid grid-cols-4 gap-4">
          {reviews.length === 0 ? (
            <p className="text-center text-gray-500">レビューがありません</p>
          ) : (
            reviews.map((r, idx) => (
              <ReviewCard
                key={idx}
                review={r}
                onClick={() => navigate(`/reviews/${r.reviewId}`)}
              />
            ))
          )}
        </div>

      <AddButton onClick={() => navigate("/reviews/edit")} />
    </div>
  );
}

export default ReviewListPage;