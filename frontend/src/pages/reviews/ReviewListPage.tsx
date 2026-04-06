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

import ReviewCard from "@/components/card/ReviewCard";
import AddButton from "@/components/button/AddButton";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ReviewListPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [reviews, setReviews] = useState<Review[]>([]);
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

  const fetchReviews = async () => {
    try {
      const res: Response = await fetch(`${API_BASE_URL}/reviews?page=${page}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      });

      if (res.ok) {
        const data: ReviewListResponse = await res.json();
        setReviews(data.reviews);
        setTotalPages(data.totalPages);
      } else {
        console.error("Get reviews failed");
      }
    } catch (e) {
      console.error("Get reviews failed: " + e);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [location.search]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 text-center my-6">レビュー一覧</h1>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => page > 1 && navigate(`/reviews?page=${page - 1}`)}
              className={page <= 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {startPage > 1 && (
            <>
              <PaginationItem>
                <PaginationLink onClick={() => navigate(`/reviews?page=1`)}>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </>
          )}

          {pageNumbers.map(p => (
            <PaginationItem key={p}>
              <PaginationLink onClick={() => navigate(`/reviews?page=${p}`)} isActive={p === page}>
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
                <PaginationLink onClick={() => navigate(`/reviews?page=${totalPages}`)}>
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => page < totalPages && navigate(`/reviews?page=${page + 1}`)}
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